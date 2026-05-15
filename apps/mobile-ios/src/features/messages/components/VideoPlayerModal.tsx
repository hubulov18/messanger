/**
 * Full-screen in-app video player overlay.
 *
 * Intentionally NOT a React Native <Modal> — Modal creates a separate UIWindow
 * which prevents AVPlayerLayer from rendering video frames (audio still plays).
 * Instead this renders as a plain absolute-positioned View at the app root so
 * everything is in the same UIWindow.
 *
 * Mounted / unmounted by VideoPlayerProvider (AppProviders.tsx).
 */

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
// @ts-ignore – TypeScript 5.9 export* regression
import { ActivityIndicator, Pressable, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import Video from 'react-native-video';
import type { OnLoadData, OnBufferData, OnVideoErrorData, OnProgressData, VideoRef } from 'react-native-video';
import { useTranslation } from '@shared/i18n';

export type VideoPlayerOverlayProps = {
  videoUrl: string;
  mimeType?: string | undefined;
  title?: string | undefined;
  caption?: string | null | undefined;
  onClose: () => void;
};

type VideoState = 'loading' | 'ready' | 'buffering' | 'error';

// ─── Colours ────────────────────────────────────────────────────────────────
const C = {
  bg: '#000',
  accent: '#2AABEE',
  white: '#fff',
  dim: 'rgba(255,255,255,0.65)',
  controlBg: 'rgba(255,255,255,0.15)',
  overlayTop: 'rgba(0,0,0,0.72)',
  overlayBottom: 'rgba(0,0,0,0.80)',
  track: 'rgba(255,255,255,0.28)',
};

const AUTO_HIDE_MS = 3500;

// ─── Helpers ────────────────────────────────────────────────────────────────
function fmt(secs: number): string {
  const s = Math.floor(Math.max(0, secs));
  const m = Math.floor(s / 60);
  const h = Math.floor(m / 60);
  const ss = s % 60;
  const mm = m % 60;
  if (h > 0) return `${h}:${pad(mm)}:${pad(ss)}`;
  return `${m}:${pad(ss)}`;
}
function pad(n: number) { return n < 10 ? `0${n}` : String(n); }

// ─── Component ──────────────────────────────────────────────────────────────
export function VideoPlayerModal({ videoUrl, mimeType, title, caption, onClose }: VideoPlayerOverlayProps) {
  const { t } = useTranslation();
  const videoRef = useRef<VideoRef>(null);

  const [state, setState] = useState<VideoState>('loading');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [paused, setPaused] = useState(false);
  const [duration, setDuration] = useState(0);
  const [current, setCurrent] = useState(0);
  const [barW, setBarW] = useState(0);
  const [ctrlVisible, setCtrlVisible] = useState(true);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showControls = useCallback(() => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setCtrlVisible(true);
    hideTimer.current = setTimeout(() => setCtrlVisible(false), AUTO_HIDE_MS);
  }, []);

  // Init on mount.
  useEffect(() => {
    showControls();
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, [showControls]);

  // ── Video callbacks ──────────────────────────────────────────────────────
  function handleLoad(d: OnLoadData) {
    setDuration(d.duration);
    setState('ready');
  }

  function handleProgress(d: OnProgressData) {
    setCurrent(d.currentTime);
  }

  function handleBuffer({ isBuffering }: OnBufferData) {
    setState(prev =>
      prev === 'ready' || prev === 'buffering'
        ? isBuffering ? 'buffering' : 'ready'
        : prev,
    );
  }

  function handleError(err: OnVideoErrorData) {
    const msg =
      (err as any)?.error?.localizedDescription ??
      (err as any)?.error?.localizedFailureReason ??
      t('messages.video_player.error_play');
    setErrorMsg(msg);
    setState('error');
  }

  function handleEnd() {
    try { videoRef.current?.seek(0); } catch { /* ignore */ }
    setPaused(true);
    setCurrent(0);
    showControls();
  }

  // ── Controls ──────────────────────────────────────────────────────────────
  function togglePlay() {
    showControls();
    setPaused(p => !p);
  }

  function seekDelta(delta: number) {
    showControls();
    const next = Math.max(0, Math.min(duration, current + delta));
    try { videoRef.current?.seek(next); } catch { /* ignore */ }
    setCurrent(next);
  }

  function seekToRatio(locationX: number) {
    if (barW <= 0 || duration <= 0) return;
    showControls();
    const ratio = Math.max(0, Math.min(1, locationX / barW));
    const t = ratio * duration;
    try { videoRef.current?.seek(t); } catch { /* ignore */ }
    setCurrent(t);
  }

  function retry() {
    setState('loading');
    setErrorMsg(null);
    setPaused(false);
    setCurrent(0);
    showControls();
  }

  // ── Derived ───────────────────────────────────────────────────────────────
  const progress = duration > 0 ? Math.min(1, current / duration) : 0;
  const fillPx = barW * progress;
  const showSpinner = state === 'loading' || state === 'buffering';
  // controls={true} on iOS uses AVPlayerViewController which requires addChildViewController
  // embedding — without it, video frames never render (audio-only). Use controls={false}
  // everywhere and rely on the custom controls overlay below.
  const showCtrl = ctrlVisible && state !== 'error';
  const videoSource = useMemo(
    () => ({
      uri: videoUrl,
      isNetwork: /^(https?):/i.test(videoUrl),
      ...(mimeType ? { type: mimeType } : {}),
    }),
    [mimeType, videoUrl],
  );

  return (
    <View style={styles.root}>
      <StatusBar hidden />

      {/* ── Video ──────────────────────────────────────────────────────────── */}
      {/* controls={false} everywhere: controls={true} on iOS uses AVPlayerViewController
          which must be embedded via addChildViewController — adding its view as a plain
          subview prevents video frames from rendering (audio-only symptom).
          AVPlayerLayer (controls=false) only needs a non-zero frame, which flex:1 provides. */}
      {state !== 'error' ? (
        <Video
          ref={videoRef}
          source={videoSource}
          style={StyleSheet.absoluteFillObject as Record<string, unknown>}
          resizeMode="contain"
          controls={false}
          paused={paused}
          ignoreSilentSwitch="ignore"
          progressUpdateInterval={500}
          onLoad={handleLoad}
          onProgress={handleProgress}
          onBuffer={handleBuffer}
          onError={handleError}
          onEnd={handleEnd}
        />
      ) : null}

      {/* ── Tap layer to show / refresh controls ───────────────────────── */}
      {state !== 'error' ? (
        <Pressable style={StyleSheet.absoluteFill} onPress={showControls} />
      ) : null}

      {/* ── Spinner ──────────────────────────────────────────────────────────── */}
      {showSpinner ? (
        <View style={styles.spinnerOverlay} pointerEvents="none">
          <ActivityIndicator size="large" color={C.accent} />
          {state === 'buffering' ? (
            <Text style={styles.bufferingLabel}>{t('messages.video_player.buffering')}</Text>
          ) : null}
        </View>
      ) : null}

      {/* ── Error state ──────────────────────────────────────────────────────── */}
      {state === 'error' ? (
        <View style={styles.errorOverlay}>
          <Text style={styles.errIcon}>⚠</Text>
          <Text style={styles.errTitle}>{t('messages.video_player.error_title')}</Text>
          <Text style={styles.errBody}>{errorMsg ?? t('messages.video_player.error_unexpected')}</Text>
          <Pressable onPress={retry} style={styles.retryBtn}>
            <Text style={styles.retryText}>{t('messages.video_player.try_again')}</Text>
          </Pressable>
          <Pressable onPress={onClose} style={styles.closeErrBtn}>
            <Text style={styles.closeErrText}>{t('common.close')}</Text>
          </Pressable>
        </View>
      ) : null}

      {/* ── Controls overlay ─────────────────────────────────────────────────── */}
      {showCtrl ? (
        <View style={StyleSheet.absoluteFill} pointerEvents="box-none">

          {/* Top bar */}
          <SafeAreaView style={styles.topBar} pointerEvents="box-none">
            <View style={styles.topRow} pointerEvents="box-none">
              <Pressable onPress={onClose} hitSlop={16} style={styles.closePill}>
                <Text style={styles.closePillText}>✕</Text>
              </Pressable>
              <View style={styles.titleWrap}>
                <Text style={styles.titleText} numberOfLines={1}>{title ?? ''}</Text>
              </View>
            </View>
          </SafeAreaView>

          {/* Centre playback buttons */}
          <View style={styles.centerRow} pointerEvents="box-none">
            <Pressable onPress={() => seekDelta(-10)} hitSlop={12} style={styles.seekBtn}>
              <Text style={styles.seekSymbol}>↺</Text>
              <Text style={styles.seekSec}>10</Text>
            </Pressable>
            <Pressable onPress={togglePlay} style={styles.playBtn}>
              <Text style={styles.playIcon}>{paused ? '▶' : '⏸'}</Text>
            </Pressable>
            <Pressable onPress={() => seekDelta(10)} hitSlop={12} style={styles.seekBtn}>
              <Text style={styles.seekSymbol}>↻</Text>
              <Text style={styles.seekSec}>10</Text>
            </Pressable>
          </View>

          {/* Bottom bar */}
          <SafeAreaView style={styles.bottomBar} pointerEvents="box-none">
            <View style={styles.progressRow} pointerEvents="box-none">
              <Text style={styles.timeText}>{fmt(current)}</Text>
              <Pressable
                style={styles.trackOuter}
                onLayout={(e: { nativeEvent: { layout: { width: number } } }) =>
                  setBarW(e.nativeEvent.layout.width)
                }
                onPress={(e: { nativeEvent: { locationX: number } }) =>
                  seekToRatio(e.nativeEvent.locationX)
                }
              >
                <View style={styles.track} />
                <View style={[styles.fill, { width: fillPx }]} />
                <View style={[styles.thumb, { left: Math.max(0, fillPx - 7) }]} />
              </Pressable>
              <Text style={styles.timeText}>{fmt(duration)}</Text>
            </View>
            {caption && caption.trim().length > 0 ? (
              <Text style={styles.captionText} numberOfLines={2}>{caption}</Text>
            ) : null}
          </SafeAreaView>

        </View>
      ) : null}

    </View>
  );
}

// ─── Styles ─────────────────────────────────────────────────────────────────
const styles = StyleSheet.create({
  // Single root that fills the navigation screen. VideoPlayerScreen wraps this
  // in a flex:1 view, so flex:1 here gives AVPlayerLayer a concrete non-zero frame.
  root: {
    flex: 1,
    backgroundColor: C.bg,
  },

  // ── Spinner ───────────────────────────────────────────────────────────────
  spinnerOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bufferingLabel: { color: C.dim, fontSize: 13, marginTop: 10 },

  // ── Error ─────────────────────────────────────────────────────────────────
  errorOverlay: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 36,
  },
  errIcon:  { color: '#ffb4b4', fontSize: 40, marginBottom: 14 },
  errTitle: { color: C.white,   fontSize: 19, fontWeight: '700', marginBottom: 8,  textAlign: 'center' },
  errBody:  { color: C.dim,     fontSize: 14, lineHeight: 21,    marginBottom: 28, textAlign: 'center' },
  retryBtn: {
    backgroundColor: C.accent,
    borderRadius: 14,
    marginBottom: 12,
    paddingHorizontal: 28,
    paddingVertical: 12,
  },
  retryText:    { color: C.white, fontSize: 16, fontWeight: '600' },
  closeErrBtn:  { backgroundColor: C.controlBg, borderRadius: 14, paddingHorizontal: 28, paddingVertical: 12 },
  closeErrText: { color: C.white, fontSize: 15 },

  // ── Top bar ───────────────────────────────────────────────────────────────
  topBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    backgroundColor: C.overlayTop,
    paddingBottom: 12,
  },
  topRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 12,
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  titleWrap: {
    flex: 1,
    minWidth: 0,
  },
  closePill: {
    alignItems: 'center',
    backgroundColor: C.controlBg,
    borderRadius: 20,
    height: 36,
    justifyContent: 'center',
    width: 36,
  },
  closePillText: { color: C.white, fontSize: 14, fontWeight: '700' },
  titleText: {
    color: C.white,
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'left',
  },

  // ── Centre controls ───────────────────────────────────────────────────────
  centerRow: {
    alignItems: 'center',
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  seekBtn: {
    alignItems: 'center',
    height: 56,
    justifyContent: 'center',
    marginHorizontal: 28,
    width: 56,
  },
  seekSymbol: { color: C.white, fontSize: 28, lineHeight: 30 },
  seekSec:    { color: C.white, fontSize: 11, fontWeight: '700', marginTop: -2 },
  playBtn: {
    alignItems: 'center',
    backgroundColor: C.controlBg,
    borderColor: 'rgba(255,255,255,0.35)',
    borderRadius: 40,
    borderWidth: 1.5,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  playIcon: { color: C.white, fontSize: 30 },

  // ── Bottom bar ────────────────────────────────────────────────────────────
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: C.overlayBottom,
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  progressRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  timeText: {
    color: C.white,
    fontSize: 12,
    fontWeight: '500',
    minWidth: 38,
    textAlign: 'center',
  },
  trackOuter: {
    flex: 1,
    height: 28,
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  track: {
    backgroundColor: C.track,
    borderRadius: 2,
    height: 4,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  fill: {
    backgroundColor: C.accent,
    borderRadius: 2,
    height: 4,
    left: 0,
    position: 'absolute',
  },
  thumb: {
    backgroundColor: C.white,
    borderRadius: 7,
    height: 14,
    position: 'absolute',
    top: 7,
    width: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.45,
    shadowRadius: 3,
  },
  captionText: {
    color: C.dim,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 10,
    textAlign: 'center',
  },
});
