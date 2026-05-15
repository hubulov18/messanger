import { useEffect, useRef } from 'react';
import type { AppStateStatus } from 'react-native';

import type { ActiveCallSession } from '../state/call-session.store';

export type CallRecoveryReason =
  | 'app_active'
  | 'peer_disconnected'
  | 'peer_failed'
  | 'manual_retry';

type TransportStatus = 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed';
type AppStateRef = { current: AppStateStatus };

type CallRecoveryControllerParams = {
  appStateRef: AppStateRef;
  getCurrentCall: () => ActiveCallSession | null;
  getTransportStatus: () => TransportStatus;
  logCallFlow: (message: string, details?: Record<string, unknown>) => void;
  onSendHeartbeat: (callId: string) => void;
  onRecover: (reason: CallRecoveryReason) => Promise<void>;
  onTerminalCleanup: (callId: string) => void;
};

export function useCallRecoveryController({
  appStateRef,
  getCurrentCall,
  getTransportStatus,
  logCallFlow,
  onSendHeartbeat,
  onRecover,
  onTerminalCleanup,
}: CallRecoveryControllerParams) {
  const heartbeatTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recoveryInFlightRef = useRef<Promise<void> | null>(null);
  const terminalCleanupTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const delayedRecoveryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const reconnectWatchdogTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const recoveryBudgetRef = useRef<{ windowStartedAt: number; attempts: number }>({
    windowStartedAt: 0,
    attempts: 0,
  });
  const onRecoverRef = useRef(onRecover);
  const onSendHeartbeatRef = useRef(onSendHeartbeat);
  const onTerminalCleanupRef = useRef(onTerminalCleanup);

  useEffect(() => {
    onRecoverRef.current = onRecover;
  }, [onRecover]);

  useEffect(() => {
    onSendHeartbeatRef.current = onSendHeartbeat;
  }, [onSendHeartbeat]);

  useEffect(() => {
    onTerminalCleanupRef.current = onTerminalCleanup;
  }, [onTerminalCleanup]);

  function clearTerminalCleanupTimer() {
    if (terminalCleanupTimerRef.current) {
      clearTimeout(terminalCleanupTimerRef.current);
      terminalCleanupTimerRef.current = null;
    }
  }

  function clearDelayedRecoveryTimer() {
    if (delayedRecoveryTimerRef.current) {
      clearTimeout(delayedRecoveryTimerRef.current);
      delayedRecoveryTimerRef.current = null;
    }
  }

  function clearReconnectWatchdog() {
    if (reconnectWatchdogTimerRef.current) {
      clearTimeout(reconnectWatchdogTimerRef.current);
      reconnectWatchdogTimerRef.current = null;
    }
  }

  function resetRecoveryBudget() {
    recoveryBudgetRef.current = {
      windowStartedAt: 0,
      attempts: 0,
    };
  }

  function stopHeartbeat() {
    if (heartbeatTimerRef.current) {
      clearInterval(heartbeatTimerRef.current);
      heartbeatTimerRef.current = null;
    }
  }

  function clearAllTimers() {
    stopHeartbeat();
    clearTerminalCleanupTimer();
    clearDelayedRecoveryTimer();
    clearReconnectWatchdog();
    resetRecoveryBudget();
  }

  function startHeartbeat(callId: string) {
    stopHeartbeat();
    onSendHeartbeatRef.current(callId);
    heartbeatTimerRef.current = setInterval(() => {
      onSendHeartbeatRef.current(callId);
    }, 15000);
  }

  async function runRecovery(reason: CallRecoveryReason) {
    if (recoveryInFlightRef.current) {
      return recoveryInFlightRef.current;
    }

    const recovery = (async () => {
      try {
        await onRecoverRef.current(reason);
      } finally {
        recoveryInFlightRef.current = null;
      }
    })();

    recoveryInFlightRef.current = recovery;
    return recovery;
  }

  function resolveRecoveryDelay(baseDelayMs: number) {
    const now = Date.now();
    const currentBudget = recoveryBudgetRef.current;
    const inActiveWindow = now - currentBudget.windowStartedAt <= 30000;
    const attempts = inActiveWindow ? currentBudget.attempts + 1 : 1;
    recoveryBudgetRef.current = {
      windowStartedAt: inActiveWindow ? currentBudget.windowStartedAt : now,
      attempts,
    };

    const additionalDelayMs = Math.min((attempts - 1) * 1500, 8000);
    return {
      attempts,
      effectiveDelayMs: baseDelayMs + additionalDelayMs,
    };
  }

  function scheduleRecovery(reason: CallRecoveryReason, delayMs: number) {
    const currentCall = getCurrentCall();
    if (!currentCall) {
      return;
    }

    if (appStateRef.current !== 'active' && reason !== 'manual_retry') {
      return;
    }

    const { attempts, effectiveDelayMs } = resolveRecoveryDelay(delayMs);
    logCallFlow('recovery:schedule', {
      callId: currentCall.callId,
      reason,
      attempts,
      baseDelayMs: delayMs,
      effectiveDelayMs,
      appState: appStateRef.current,
    });

    clearDelayedRecoveryTimer();
    delayedRecoveryTimerRef.current = setTimeout(() => {
      delayedRecoveryTimerRef.current = null;
      void runRecovery(reason);
    }, effectiveDelayMs);
  }

  function scheduleReconnectWatchdog(callId: string) {
    if (reconnectWatchdogTimerRef.current) {
      return;
    }

    reconnectWatchdogTimerRef.current = setTimeout(() => {
      reconnectWatchdogTimerRef.current = null;
      const currentCall = getCurrentCall();
      const transportStatus = getTransportStatus();
      if (!currentCall || currentCall.callId !== callId) {
        return;
      }

      if (
        transportStatus === 'connected'
        || ['ended', 'declined', 'missed', 'canceled', 'failed'].includes(currentCall.state)
      ) {
        return;
      }

      logCallFlow('watchdog:reconnect:trigger', {
        callId,
        transportStatus,
        callState: currentCall.state,
      });
      scheduleRecovery('peer_disconnected', 0);
    }, 30000);
  }

  function scheduleTerminalCleanup(callId: string) {
    clearTerminalCleanupTimer();
    terminalCleanupTimerRef.current = setTimeout(() => {
      if (getCurrentCall()?.callId === callId) {
        onTerminalCleanupRef.current(callId);
      }
      terminalCleanupTimerRef.current = null;
    }, 1200);
  }

  useEffect(() => clearAllTimers, []);

  return {
    clearAllTimers,
    clearDelayedRecoveryTimer,
    clearReconnectWatchdog,
    clearTerminalCleanupTimer,
    resetRecoveryBudget,
    runRecovery,
    scheduleRecovery,
    scheduleReconnectWatchdog,
    scheduleTerminalCleanup,
    startHeartbeat,
    stopHeartbeat,
  };
}
