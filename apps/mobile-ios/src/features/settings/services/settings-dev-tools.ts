import { env } from '@shared/config/env';
import {
  describeUiBubbleRendererMode,
  resolveUseRealUiBubbles,
  useUiBubbleRendererStore,
} from '@shared/ui/ui-bubble-renderer.store';

export function isDeveloperSettingsEnabled() {
  return true;
}

export function getDeveloperSettingsSnapshot(params: {
  userId: string | null;
  deviceId: string | null;
  authStatus: string;
}) {
  const bubbleRendererMode = useUiBubbleRendererStore.getState().mode;
  const resolvedUseRealUiBubbles = resolveUseRealUiBubbles({
    envEnabled: env.features.useRealUiBubbles,
    mode: bubbleRendererMode,
  });

  return {
    apiBaseUrl: env.apiBaseUrl,
    callSignalingUrl: env.callSignalingUrl,
    callsV1: env.features.callsV1,
    voipPushIncoming: env.features.voipPushIncoming,
    useRealUiBubbles: env.features.useRealUiBubbles,
    bubbleRendererMode,
    resolvedUseRealUiBubbles,
    bubbleRendererModeLabel: describeUiBubbleRendererMode({
      mode: bubbleRendererMode,
      resolvedUseRealUiBubbles,
    }),
    userId: params.userId,
    deviceId: params.deviceId,
    authStatus: params.authStatus,
  };
}
