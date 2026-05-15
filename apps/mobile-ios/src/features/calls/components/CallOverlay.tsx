import { useEffect, useRef, useState } from 'react';
// @ts-ignore – TypeScript 5.9 export* regression: Animated (namespace) and PanResponder (const) not re-exported from react-native index
import { Animated, Pressable, PanResponder, StyleSheet, Text, View } from 'react-native';
// @ts-ignore – TypeScript 5.9 export* regression: RTCView not re-exported from react-native-webrtc index
import { RTCView } from 'react-native-webrtc';

import { useSessionStore } from '@shared/auth/session.store';
import { resolveKnownUserLabel } from '@shared/chats/chat-directory.store';
import { useTranslation } from '@shared/i18n';
import { telegramColors, telegramShadows, telegramText } from '@shared/ui/ios/theme';
import { useCallSessionStore } from '../state/call-session.store';
import { registerCallPiPView, unregisterCallPiPView } from '../services/call-pip-controller';
import {
  acceptIncomingCall,
  declineIncomingCall,
  endCurrentCall,
  retryCurrentCall,
  toggleCallMute,
  toggleCallSpeaker,
  toggleCallVideo,
} from '../services/call-coordinator';

const PIP_INITIAL_TOP = 60;
const PIP_INITIAL_RIGHT = 16;

export function CallOverlay() {
  const { t } = useTranslation();
  const currentUser = useSessionStore((state) => state.currentUser);
  const currentCall = useCallSessionStore((state) => state.currentCall);
  const isMuted = useCallSessionStore((state) => state.isMuted);
  const isSpeakerOn = useCallSessionStore((state) => state.isSpeakerOn);
  const isVideoEnabled = useCallSessionStore((state) => state.isVideoEnabled);
  const errorMessage = useCallSessionStore((state) => state.errorMessage);
  const transportStatus = useCallSessionStore((state) => state.transportStatus);
  const localStream = useCallSessionStore((state) => state.localStream);
  const remoteStream = useCallSessionStore((state) => state.remoteStream);
  const [now, setNow] = useState<number>(Date.now());
  const remotePiPViewRef = useRef(null);

  // Draggable PiP position
  const pipPosition = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        pipPosition.stopAnimation();
        pipPosition.extractOffset();
      },
      onPanResponderMove: Animated.event([null, { dx: pipPosition.x, dy: pipPosition.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: () => {
        pipPosition.flattenOffset();
      },
    }),
  ).current;

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!currentCall || currentCall.callType !== 'video') {
      unregisterCallPiPView(remotePiPViewRef);
      return;
    }

    registerCallPiPView(remotePiPViewRef);
    return () => {
      unregisterCallPiPView(remotePiPViewRef);
    };
  }, [currentCall?.callId, currentCall?.callType]);

  if (!currentCall) {
    return null;
  }

  const isVideo = currentCall.callType === 'video';
  const counterpartLabel = currentCall.counterpartUserId
    ? resolveKnownUserLabel({
        userId: currentCall.counterpartUserId,
        currentUserId: currentUser?.id,
        currentUserDisplayName: currentUser?.displayName,
      })
    : isVideo
      ? t('calls.video_call')
      : t('calls.voice_call');
  const isIncomingRinging = currentCall.role === 'callee' && currentCall.state === 'ringing';
  const canRetry = !isIncomingRinging && (transportStatus === 'failed' || transportStatus === 'reconnecting' || !!errorMessage);
  const callStatusText = describeCallStatus(currentCall.state, currentCall.role, transportStatus, currentCall, now, t);
  const kickerLabel = isIncomingRinging
    ? isVideo
      ? t('calls.incoming_video')
      : t('calls.incoming_voice')
    : isVideo
      ? t('calls.video_call')
      : t('calls.voice_call');
  const counterpartInitials = buildCounterpartInitials(counterpartLabel);
  const videoControlButtons = [
    {
      key: 'mute',
      icon: isMuted ? '🔇' : '🎤',
      label: isMuted ? t('calls.action_unmute') : t('calls.action_mute'),
      active: isMuted,
      onPress: () => void toggleCallMute(),
    },
    {
      key: 'video',
      icon: isVideoEnabled ? '📹' : '📷',
      label: isVideoEnabled ? t('calls.action_cam_off') : t('calls.action_cam_on'),
      active: !isVideoEnabled,
      onPress: () => void toggleCallVideo(),
    },
    {
      key: 'speaker',
      icon: isSpeakerOn ? '🔊' : '📢',
      label: t('calls.action_speaker'),
      active: isSpeakerOn,
      onPress: () => void toggleCallSpeaker(),
    },
  ];

  // Video call — full-screen overlay
  if (isVideo) {
    const localStreamUrl = localStream?.toURL();
    const remoteStreamUrl = remoteStream?.toURL();

    return (
      <View style={styles.videoRoot} pointerEvents="box-none">
        {/* Remote video background */}
        {remoteStreamUrl ? (
          <RTCView
            ref={remotePiPViewRef}
            streamURL={remoteStreamUrl}
            style={styles.remoteVideo}
            objectFit="cover"
            mirror={false}
            iosPIP={{
              enabled: true,
              startAutomatically: false,
              stopAutomatically: false,
              preferredSize: {
                width: 540,
                height: 960,
              },
            }}
          />
        ) : (
          <View style={styles.remoteVideoPlaceholder}>
            <View style={styles.videoGlowPrimary} />
            <View style={styles.videoGlowSecondary} />
            <View style={styles.videoPlaceholderAvatar}>
              <Text style={styles.videoPlaceholderAvatarText}>{counterpartInitials}</Text>
            </View>
            <Text style={styles.remoteVideoPlaceholderText}>{counterpartLabel}</Text>
            <Text style={styles.statusTextLarge}>{callStatusText}</Text>
            <View style={styles.waveformRow}>
              {Array.from({ length: 20 }).map((_, index) => {
                const height = 10 + ((index * 7) % 18);
                return <View key={index} style={[styles.waveformBar, styles.waveformBarBright, { height }]} />;
              })}
            </View>
          </View>
        )}

        <View style={styles.videoBackdropScrim} pointerEvents="none" />

        <View style={styles.videoTopOverlay} pointerEvents="none">
          <Text style={styles.videoKicker}>{kickerLabel}</Text>
          <Text style={styles.videoTitle}>{counterpartLabel}</Text>
          <Text style={styles.videoStatus}>{callStatusText}</Text>
          {errorMessage ? (
            <View style={styles.videoErrorCard}>
              <Text style={styles.videoError}>{errorMessage}</Text>
            </View>
          ) : null}
        </View>

        {/* Draggable local video PiP */}
        {localStreamUrl && isVideoEnabled ? (
          <Animated.View
            style={[styles.localVideoPip, { transform: pipPosition.getTranslateTransform() }]}
            {...panResponder.panHandlers}
          >
            <RTCView
              streamURL={localStreamUrl}
              style={styles.localVideoView}
              objectFit="cover"
              mirror
            />
          </Animated.View>
        ) : null}

        <View style={styles.videoFooter}>
          {canRetry ? (
            <Pressable onPress={() => void retryCurrentCall()} style={styles.videoRetryButton}>
              <Text style={styles.videoRetryText}>{t('calls.action_retry')}</Text>
            </Pressable>
          ) : null}

          {isIncomingRinging ? (
            <View style={styles.videoIncomingRow}>
              <View style={styles.videoControlSlot}>
                <Pressable onPress={() => void declineIncomingCall()} style={[styles.videoCircleButton, styles.declineCircle]}>
                  <Text style={styles.circleButtonIcon}>✕</Text>
                </Pressable>
                <Text style={styles.videoControlLabel}>{t('calls.action_decline')}</Text>
              </View>
              <View style={styles.videoControlSlot}>
                <Pressable onPress={() => void acceptIncomingCall()} style={[styles.videoCircleButton, styles.acceptCircle]}>
                  <Text style={styles.circleButtonIcon}>✓</Text>
                </Pressable>
                <Text style={styles.videoControlLabel}>{t('calls.action_accept')}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.videoControlsWrap}>
              <View style={styles.videoControlsGrid}>
              {videoControlButtons.map((button) => (
                <View key={button.key} style={styles.videoControlSlot}>
                  <Pressable onPress={button.onPress} style={[styles.videoCircleControl, button.active ? styles.videoCircleControlActive : null]}>
                    <Text style={styles.videoControlIcon}>{button.icon}</Text>
                  </Pressable>
                  <Text style={styles.videoControlLabel}>{button.label}</Text>
                </View>
              ))}
              </View>
              <Pressable onPress={() => void endCurrentCall()} style={[styles.videoCircleButton, styles.declineCircle, styles.videoEndButton]}>
                <Text style={styles.circleButtonIcon}>📵</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    );
  }

  // Audio call — compact card
  return (
    <View pointerEvents="box-none" style={styles.audioOverlayRoot}>
      <View style={styles.audioBackdrop} />
      <View style={styles.audioGlowPrimary} pointerEvents="none" />
      <View style={styles.audioGlowSecondary} pointerEvents="none" />
      <View style={styles.audioOverlayCard}>
        <View style={styles.audioHero}>
          <View style={styles.audioAvatar}>
            <Text style={styles.audioAvatarText}>{counterpartInitials}</Text>
          </View>
          <Text style={styles.title}>{counterpartLabel}</Text>
          <Text style={styles.status}>{callStatusText}</Text>
          <View style={styles.waveformRow}>
            {Array.from({ length: 24 }).map((_, index) => {
              const height = 8 + ((index * 11) % 18);
              return <View key={index} style={[styles.waveformBar, { height }]} />;
            })}
          </View>
        </View>

        <View style={styles.audioFooter}>
          {errorMessage ? (
            <View style={styles.audioErrorCard}>
              <Text style={styles.error}>{errorMessage}</Text>
            </View>
          ) : null}
          {canRetry ? (
            <Pressable onPress={() => void retryCurrentCall()} style={styles.retryButton}>
              <Text style={styles.retryButtonText}>{t('calls.action_retry')}</Text>
            </Pressable>
          ) : null}

          {isIncomingRinging ? (
            <View style={styles.incomingActionRow}>
              <View style={styles.audioControlSlot}>
                <Pressable onPress={() => void declineIncomingCall()} style={[styles.audioCircleButton, styles.declineCircle]}>
                  <Text style={styles.circleButtonIcon}>✕</Text>
                </Pressable>
                <Text style={styles.audioControlLabel}>{t('calls.action_decline')}</Text>
              </View>
              <View style={styles.audioControlSlot}>
                <Pressable onPress={() => void acceptIncomingCall()} style={[styles.audioCircleButton, styles.acceptCircle]}>
                  <Text style={styles.circleButtonIcon}>✓</Text>
                </Pressable>
                <Text style={styles.audioControlLabel}>{t('calls.action_accept')}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.audioControlsWrap}>
              <View style={styles.audioControlsGrid}>
                <View style={styles.audioControlSlot}>
                  <Pressable onPress={() => void toggleCallMute()} style={[styles.audioCircleControl, isMuted ? styles.audioCircleControlActive : null]}>
                    <Text style={styles.videoControlIcon}>{isMuted ? '🔇' : '🎤'}</Text>
                  </Pressable>
                  <Text style={styles.audioControlLabel}>{isMuted ? t('calls.action_unmute') : t('calls.action_mute')}</Text>
                </View>
                <View style={styles.audioControlSlot}>
                  <Pressable onPress={() => void toggleCallVideo()} style={styles.audioCircleControl}>
                    <Text style={styles.videoControlIcon}>📹</Text>
                  </Pressable>
                  <Text style={styles.audioControlLabel}>{t('calls.video_call')}</Text>
                </View>
                <View style={styles.audioControlSlot}>
                  <Pressable onPress={() => void toggleCallSpeaker()} style={[styles.audioCircleControl, isSpeakerOn ? styles.audioCircleControlActive : null]}>
                    <Text style={styles.videoControlIcon}>{isSpeakerOn ? '🔊' : '📢'}</Text>
                  </Pressable>
                  <Text style={styles.audioControlLabel}>{t('calls.action_speaker')}</Text>
                </View>
              </View>
              <Pressable onPress={() => void endCurrentCall()} style={[styles.audioCircleButton, styles.declineCircle, styles.audioEndButton]}>
                <Text style={styles.circleButtonIcon}>📵</Text>
              </Pressable>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

function describeCallStatus(
  state: string,
  role: 'caller' | 'callee',
  transportStatus: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed',
  call: { startedAt: string; activeAt: string | null },
  now: number,
  t: (key: string, params?: Record<string, string | number>) => string,
) {
  switch (state) {
    case 'ringing':
      return role === 'caller' ? t('calls.state_calling') : t('calls.state_ringing');
    case 'accepted':
      if (transportStatus === 'failed') {
        return t('calls.state_setup_failed');
      }

      return transportStatus === 'reconnecting' ? t('calls.state_reconnecting') : t('calls.state_connecting');
    case 'active':
      return buildActiveCallStatus(call, transportStatus, now, t);
    case 'declined':
      return t('calls.state_declined');
    case 'missed':
      return t('calls.state_missed');
    case 'canceled':
      return t('calls.state_canceled');
    case 'failed':
      return t('calls.state_failed');
    case 'ended':
      return t('calls.state_ended');
    default:
      return t('calls.state_preparing');
  }
}

function buildActiveCallStatus(
  call: { startedAt: string; activeAt: string | null },
  transportStatus: 'idle' | 'connecting' | 'connected' | 'reconnecting' | 'failed',
  now: number,
  t: (key: string, params?: Record<string, string | number>) => string,
) {
  if (transportStatus === 'connecting') {
    return t('calls.state_connecting');
  }

  const baseline = Date.parse(call.activeAt ?? call.startedAt);
  const durationSec = Number.isNaN(baseline) ? 0 : Math.max(0, Math.floor((now - baseline) / 1000));
  const durationLabel = formatCallDuration(durationSec);

  if (transportStatus === 'reconnecting') {
    return t('calls.state_reconnecting_duration', { duration: durationLabel });
  }

  if (transportStatus === 'failed') {
    return t('calls.state_failed_duration', { duration: durationLabel });
  }

  return durationLabel;
}

function formatCallDuration(durationSec: number) {
  const hours = Math.floor(durationSec / 3600);
  const minutes = Math.floor((durationSec % 3600) / 60);
  const seconds = durationSec % 60;

  if (hours > 0) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  }

  return `${minutes}:${String(seconds).padStart(2, '0')}`;
}

function buildCounterpartInitials(value: string) {
  const parts = value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);

  if (parts.length === 0) {
    return 'C';
  }

  return parts.map((part) => part[0]?.toUpperCase() ?? '').join('');
}

const VIDEO_CARD_BG = 'rgba(17, 24, 39, 0.72)';
const DARK_SURFACE = '#131826';

const styles = StyleSheet.create({
  // ── Video call ────────────────────────────────────────────────────────────
  videoRoot: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 100,
    backgroundColor: '#000',
  },
  remoteVideo: {
    flex: 1,
  },
  remoteVideoPlaceholder: {
    alignItems: 'center',
    backgroundColor: '#181B28',
    flex: 1,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: 24,
  },
  videoGlowPrimary: {
    backgroundColor: 'rgba(109, 87, 210, 0.18)',
    borderRadius: 220,
    height: 300,
    left: -60,
    position: 'absolute',
    top: 40,
    width: 300,
  },
  videoGlowSecondary: {
    backgroundColor: 'rgba(76, 135, 122, 0.15)',
    borderRadius: 220,
    height: 260,
    position: 'absolute',
    right: -70,
    top: 220,
    width: 260,
  },
  videoPlaceholderAvatar: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    height: 100,
    justifyContent: 'center',
    marginBottom: 16,
    width: 100,
    ...telegramShadows.avatar,
  },
  videoPlaceholderAvatarText: {
    color: telegramColors.accentDeep,
    fontSize: 34,
    fontWeight: '800',
  },
  remoteVideoPlaceholderText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  statusTextLarge: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 16,
    textAlign: 'center',
  },
  videoBackdropScrim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(14,16,24,0.22)',
  },
  videoTopOverlay: {
    alignItems: 'center',
    gap: 4,
    left: 0,
    paddingHorizontal: 20,
    paddingTop: 34,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  videoKicker: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  videoTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 6,
    textAlign: 'center',
  },
  videoStatus: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 15,
    marginTop: 4,
    textAlign: 'center',
  },
  videoErrorCard: {
    alignSelf: 'center',
    backgroundColor: 'rgba(181,71,62,0.18)',
    borderRadius: 999,
    marginTop: 10,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  videoError: {
    color: '#ffd1cd',
    fontSize: 13,
    fontWeight: '600',
  },
  localVideoPip: {
    borderColor: 'rgba(255,255,255,0.2)',
    borderRadius: 18,
    bottom: undefined,
    height: 160,
    overflow: 'hidden',
    position: 'absolute',
    right: PIP_INITIAL_RIGHT,
    top: PIP_INITIAL_TOP,
    width: 100,
    borderWidth: 1.5,
    shadowColor: '#000',
    shadowOpacity: 0.32,
    shadowRadius: 10,
    elevation: 10,
  },
  localVideoView: {
    flex: 1,
  },
  videoFooter: {
    alignItems: 'center',
    bottom: 28,
    gap: 18,
    left: 18,
    position: 'absolute',
    right: 18,
  },
  videoRetryButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(18,20,30,0.6)',
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  videoRetryText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  videoIncomingRow: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    width: '100%',
  },
  videoControlsWrap: {
    alignItems: 'center',
    gap: 28,
    width: '100%',
  },
  videoControlsGrid: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    width: '100%',
  },
  videoControlSlot: {
    alignItems: 'center',
    gap: 8,
  },
  videoCircleControl: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  videoCircleControlActive: {
    backgroundColor: 'rgba(212,148,58,0.22)',
    ...telegramShadows.button,
  },
  videoControlIcon: {
    fontSize: 24,
  },
  videoControlLabel: {
    color: 'rgba(255,255,255,0.64)',
    fontSize: 12,
    fontWeight: '500',
  },
  videoCircleButton: {
    alignItems: 'center',
    borderRadius: 34,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  videoEndButton: {
    ...telegramShadows.button,
  },
  circleButtonIcon: {
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  acceptCircle: {
    backgroundColor: telegramColors.online,
  },
  declineCircle: {
    backgroundColor: '#8b2635',
  },

  // ── Audio call card ────────────────────────────────────────────────────────
  audioOverlayRoot: {
    alignItems: 'stretch',
    backgroundColor: '#141829',
    bottom: 0,
    justifyContent: 'space-between',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 50,
  },
  audioBackdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#171B2A',
  },
  audioGlowPrimary: {
    backgroundColor: 'rgba(109, 87, 210, 0.22)',
    borderRadius: 220,
    height: 320,
    left: -70,
    position: 'absolute',
    top: -24,
    width: 320,
  },
  audioGlowSecondary: {
    backgroundColor: 'rgba(76, 135, 122, 0.16)',
    borderRadius: 220,
    height: 280,
    position: 'absolute',
    right: -80,
    top: 140,
    width: 280,
  },
  audioOverlayCard: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 44,
    paddingHorizontal: 24,
    paddingTop: 64,
  },
  audioHero: {
    alignItems: 'center',
    gap: 10,
    paddingTop: 42,
  },
  audioAvatar: {
    alignItems: 'center',
    backgroundColor: telegramColors.accentSoft,
    borderRadius: 999,
    height: 100,
    justifyContent: 'center',
    width: 100,
    ...telegramShadows.avatar,
  },
  audioAvatarText: {
    color: telegramColors.accentDeep,
    fontSize: 34,
    fontWeight: '800',
  },
  kicker: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  title: {
    color: '#ffffff',
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: -0.5,
    marginTop: 6,
    textAlign: 'center',
  },
  status: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 15,
    marginTop: 2,
    textAlign: 'center',
  },
  waveformRow: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 4,
    height: 32,
    marginTop: 10,
  },
  waveformBar: {
    backgroundColor: 'rgba(255,255,255,0.45)',
    borderRadius: 999,
    width: 3,
  },
  waveformBarBright: {
    backgroundColor: 'rgba(255,255,255,0.62)',
  },
  audioFooter: {
    alignItems: 'center',
    gap: 18,
    paddingBottom: 10,
  },
  audioErrorCard: {
    backgroundColor: 'rgba(181,71,62,0.18)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 8,
  },
  error: {
    color: '#ffd1cd',
    fontSize: 13,
    fontWeight: '600',
  },
  retryButton: {
    alignSelf: 'center',
    backgroundColor: 'rgba(255,255,255,0.14)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  retryButtonText: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '700',
  },
  incomingActionRow: {
    flexDirection: 'row',
    gap: 40,
    justifyContent: 'center',
    width: '100%',
  },
  audioControlsWrap: {
    alignItems: 'center',
    gap: 28,
    width: '100%',
  },
  audioControlsGrid: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    width: '100%',
  },
  audioControlSlot: {
    alignItems: 'center',
    gap: 8,
  },
  audioCircleControl: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.12)',
    borderRadius: 28,
    height: 56,
    justifyContent: 'center',
    width: 56,
  },
  audioCircleControlActive: {
    backgroundColor: 'rgba(212,148,58,0.22)',
    ...telegramShadows.button,
  },
  audioControlLabel: {
    color: 'rgba(255,255,255,0.64)',
    fontSize: 12,
    fontWeight: '500',
  },
  audioCircleButton: {
    alignItems: 'center',
    borderRadius: 34,
    height: 72,
    justifyContent: 'center',
    width: 72,
  },
  audioEndButton: {
    ...telegramShadows.button,
  },
});
