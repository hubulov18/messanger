declare module 'react' {
  export type ReactNode = any;
  export type JSXElementConstructor<P> = (props: P) => unknown;
  export type Ref<T> =
    | ((instance: T | null) => void)
    | { current: T | null }
    | null;
  export interface FunctionComponent<P = {}> {
    (props: P): unknown;
  }
  export type ComponentType<P = {}> = FunctionComponent<P>;
  export type PropsWithChildren<P = unknown> = P & { children?: ReactNode };
  export function useEffect(effect: () => void | (() => void), deps?: unknown[]): void;
  export function useCallback<T extends (...args: never[]) => unknown>(callback: T, deps?: unknown[]): T;
  export function useMemo<T>(factory: () => T, deps?: unknown[]): T;
  export function memo<T>(component: T): T;
  export function forwardRef<T, P = {}>(
    render: (props: P, ref: Ref<T>) => unknown,
  ): ComponentType<P & { ref?: Ref<T> }>;
  export function useImperativeHandle<T, R extends T = T>(
    ref: Ref<T> | undefined,
    create: () => R,
    deps?: unknown[],
  ): void;
  export type SetStateAction<T> = T | ((prevState: T) => T);
  export function useState<T>(initialState: T): [T, (value: SetStateAction<T>) => void];
  export function useReducer<R extends (state: any, action: any) => any, I>(
    reducer: R,
    initialArg: I,
  ): [ReturnType<R>, (action: Parameters<R>[1]) => void];
  export function useRef<T>(initialValue: T): { current: T };
  export function useRef<T>(initialValue: T | null): { current: T | null };

  export type Context<T> = {
    Provider: ComponentType<{ value: T; children?: ReactNode }>;
  };
  export function createContext<T>(defaultValue: T): Context<T>;
  export function useContext<T>(context: Context<T>): T;
}

declare namespace React {
  type ReactNode = any;
  type Ref<T> =
    | ((instance: T | null) => void)
    | { current: T | null }
    | null;
}

declare module 'react/jsx-runtime' {
  export const Fragment: unknown;
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
}

declare module 'react-native' {
  import type { ComponentType } from 'react';

  export type AppStateStatus = 'active' | 'background' | 'inactive' | 'unknown' | 'extension';
  export const AppState: {
    addEventListener(type: 'change', listener: (status: AppStateStatus) => void): EmitterSubscription;
  };
  export const AppRegistry: { registerComponent(name: string, provider: () => unknown): void };
  export const Alert: {
    alert(
      title: string,
      message?: string,
      buttons?: Array<{
        text?: string;
        style?: 'default' | 'cancel' | 'destructive';
        onPress?: () => void;
      }>,
    ): void;
  };
  export const Linking: {
    canOpenURL(url: string): Promise<boolean>;
    openURL(url: string): Promise<void>;
  };
  export const Share: {
    share(content: {
      message?: string;
      url?: string;
      title?: string;
    }): Promise<Record<string, unknown>>;
  };
  export const Platform: {
    OS: 'ios' | 'android' | 'web' | string;
  };
  export const Dimensions: {
    get(dim: 'window' | 'screen'): { width: number; height: number; scale: number; fontScale: number };
    addEventListener(type: 'change', handler: (dims: { window: { width: number; height: number }; screen: { width: number; height: number } }) => void): { remove(): void };
  };
  export const NativeModules: {
    SourceCode?: {
      scriptURL?: string;
    };
    CallManagerModule?: {
      configure(enableVoipPush?: boolean): void;
      getVoipPushToken(): Promise<string | null>;
      reportIncomingCall(
        callId: string,
        handle: string,
        displayName?: string | null,
        hasVideo?: boolean,
      ): Promise<void>;
      startOutgoingCall(
        callId: string,
        handle: string,
        displayName?: string | null,
        hasVideo?: boolean,
      ): Promise<void>;
      markCallConnected(callId: string): Promise<void>;
      endCall(callId: string): Promise<void>;
      setMuted(callId: string, isMuted: boolean): Promise<void>;
      setSpeakerEnabled(enabled: boolean): Promise<void>;
    };
    PushNotificationModule?: {
      requestPermissions(): Promise<{ granted: boolean }>;
      getPermissionStatus(): Promise<{
        status: 'authorized' | 'denied' | 'not_determined' | 'provisional' | 'ephemeral' | 'unknown';
      }>;
      setApplicationBadgeCount(count: number): Promise<void>;
    };
    VoiceRecorderModule?: {
      startRecording(): Promise<void>;
      stopRecording(): Promise<Record<string, unknown>>;
      cancelRecording(): Promise<void>;
    };
    VoicePlaybackModule?: {
      play(url: string): Promise<void>;
      stop(): Promise<void>;
      getPlaybackState(): Promise<Record<string, unknown>>;
    };
    VideoPlaybackModule?: {
      present(url: string, title?: string | null): Promise<void>;
      dismiss(): Promise<void>;
    };
    DocumentPreviewModule?: {
      present(url: string, title?: string | null): Promise<void>;
      dismiss(): Promise<void>;
    };
    NotificationFeedbackModule?: {
      playNotificationSound(sound: string): Promise<boolean>;
    };
  };
  export const Vibration: {
    vibrate(pattern?: number | number[]): void;
  };
  export type EmitterSubscription = {
    remove(): void;
  };
  export type GestureResponderEvent = {
    stopPropagation(): void;
  };
  export type PressableProps = {
    onPress?: (event?: GestureResponderEvent) => void;
    onPressIn?: (event: GestureResponderEvent) => void;
    onPressOut?: (event: GestureResponderEvent) => void;
    disabled?: boolean;
    accessibilityRole?: string;
    accessibilityLabel?: string;
    accessibilityState?: Record<string, unknown>;
    style?: unknown;
    children?: React.ReactNode;
  };
  export type TextInput = {
    focus(): void;
  };
  export class NativeEventEmitter {
    constructor(nativeModule?: Record<string, unknown>);
    addListener(eventType: string, listener: (payload: unknown) => void): EmitterSubscription;
  }
  export const Animated: {
    Value: new (value: number) => {
      interpolate(config: { inputRange: number[]; outputRange: Array<number | string> }): unknown;
    };
    ValueXY: new (value: { x: number; y: number }) => {
      x: unknown;
      y: unknown;
      setValue(value: { x: number; y: number }): void;
      stopAnimation(): void;
      extractOffset(): void;
      flattenOffset(): void;
      getLayout(): unknown;
      getTranslateTransform(): unknown[];
    };
    View: ComponentType<Record<string, unknown>>;
    event(mappings: unknown[], config?: Record<string, unknown>): (...args: unknown[]) => void;
    timing(
      value: {
        interpolate(config: { inputRange: number[]; outputRange: Array<number | string> }): unknown;
      },
      config: Record<string, unknown>,
    ): { start(): void };
  };
  export const Easing: {
    quad: unknown;
    out(easing: unknown): unknown;
  };
  export const ActivityIndicator: ComponentType<Record<string, unknown>>;
  export const KeyboardAvoidingView: ComponentType<Record<string, unknown>>;
  export const Modal: ComponentType<Record<string, unknown>>;
  export const SafeAreaView: ComponentType<Record<string, unknown>>;
  export const ScrollView: ComponentType<Record<string, unknown>>;
  export const StatusBar: ComponentType<Record<string, unknown>> & { hidden?: boolean };
  export const Image: ComponentType<Record<string, unknown>>;
  export const FlatList: ComponentType<Record<string, unknown>>;
  export const View: ComponentType<Record<string, unknown>>;
  export const Text: ComponentType<Record<string, unknown>>;
  export const Pressable: ComponentType<Record<string, unknown>>;
  export const TextInput: ComponentType<Record<string, unknown>>;
  export type TextProps = Record<string, unknown>;
  export type ViewStyle = Record<string, unknown>;
  export type StyleProp<T> = T | T[] | null | undefined;
  export const StyleSheet: {
    create<T>(styles: T): T;
    hairlineWidth: number;
    absoluteFill: {
      position: 'absolute';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    };
    absoluteFillObject: {
      position: 'absolute';
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    };
  };
}

declare module '@tanstack/react-query' {
  import type { ComponentType } from 'react';

  export type RetryValue = boolean | number | ((failureCount: number, error: unknown) => boolean);
  export class QueryClient {
    constructor(options?: {
      defaultOptions?: {
        queries?: {
          staleTime?: number;
          gcTime?: number;
          refetchOnWindowFocus?: boolean;
          retry?: RetryValue;
        };
        mutations?: {
          retry?: RetryValue;
        };
      };
    });
    getQueryData<T>(queryKey: readonly unknown[]): T | undefined;
    cancelQueries(filters: { queryKey: readonly unknown[] }): Promise<void>;
    setQueryData<T>(
      queryKey: readonly unknown[],
      updater: T | undefined | ((previous: T | undefined) => T | undefined),
    ): void;
  }
  export const QueryClientProvider: ComponentType<Record<string, unknown>>;
  export const skipToken: unique symbol;
  export interface UseMutationResult<TData = unknown, TError = Error, TVariables = void, TContext = unknown> {
    mutate(variables: TVariables): void;
    isPending: boolean;
  }
  export function useQuery<TQueryFnData = unknown, TError = Error, TData = TQueryFnData>(options: {
    queryKey: readonly unknown[];
    queryFn: typeof skipToken;
    staleTime?: number;
    select?: (data: TQueryFnData) => TData;
  }): { data: TData | undefined };
  export function useQueryClient(): QueryClient;
  export function useMutation<TData = unknown, TError = Error, TVariables = void, TContext = unknown>(options: {
    mutationFn: (variables: TVariables) => Promise<TData>;
    onMutate?: (variables: TVariables) => Promise<TContext> | TContext;
    onSuccess?: (data: TData, variables: TVariables, context: TContext | undefined) => void;
    onError?: (error: TError, variables: TVariables, context: TContext | undefined) => void;
  }): UseMutationResult<TData, TError, TVariables, TContext>;
}

declare module '@react-navigation/native' {
  import type { ComponentType } from 'react';

  export const NavigationContainer: ComponentType<Record<string, unknown>>;
  export function useFocusEffect(effect: () => void | (() => void)): void;
}

declare module '@react-navigation/native-stack' {
  import type { ComponentType } from 'react';

  export function createNativeStackNavigator<T>(): {
    Navigator: ComponentType<Record<string, unknown>>;
    Screen: ComponentType<Record<string, unknown>>;
  };
}

declare module '@react-navigation/bottom-tabs' {
  import type { ComponentType } from 'react';

  export function createBottomTabNavigator<T>(): {
    Navigator: ComponentType<Record<string, unknown>>;
    Screen: ComponentType<Record<string, unknown>>;
  };
}

declare module 'zustand' {
  type PartialState<T> = Partial<T> | ((state: T) => Partial<T>);

  export function create<T>(initializer: (set: (partial: PartialState<T>) => void) => T): {
    (): T;
    <U>(selector: (state: T) => U): U;
    getState(): T;
    setState(partial: PartialState<T>): void;
  };
}

declare module 'zustand/middleware' {
  type PartialState<T> = Partial<T> | ((state: T) => Partial<T>);

  export function createJSONStorage<T>(getStorage: () => unknown): unknown;
  export function persist<T>(
    initializer: (set: (partial: PartialState<T>) => void) => T,
    options?: Record<string, unknown>,
  ): (set: (partial: PartialState<T>) => void) => T;
}

declare namespace JSX {
  type Element = any;
  interface IntrinsicElements {
    [elemName: string]: unknown;
  }
}

declare module 'react-native-image-picker' {
  export type Asset = {
    uri?: string;
    fileName?: string;
    type?: string;
    fileSize?: number;
  };

  export function launchImageLibrary(options: Record<string, unknown>): Promise<{
    didCancel?: boolean;
    errorCode?: string;
    errorMessage?: string;
    assets?: Asset[];
  }>;
}

declare module 'react-native-document-picker' {
  export type DocumentPickerResponse = {
    uri: string;
    name?: string | null;
    type?: string | null;
    size?: number | null;
  };

  export const types: {
    allFiles: string;
  };

  const DocumentPicker: {
    pick(options: Record<string, unknown>): Promise<DocumentPickerResponse[]>;
    isCancel(error: unknown): boolean;
    types: { allFiles: string };
  };

  export default DocumentPicker;
}

declare module 'react-native-sse' {
  export default class EventSource {
    constructor(url: string, options?: Record<string, unknown>);
    addEventListener(type: string, listener: (event: { data?: string }) => void): void;
    removeAllEventListeners(): void;
    close(): void;
  }
}

declare module '@react-native-async-storage/async-storage' {
  const AsyncStorage: {
    getItem(key: string): Promise<string | null>;
    setItem(key: string, value: string): Promise<void>;
    removeItem(key: string): Promise<void>;
  };

  export default AsyncStorage;
}

declare module 'socket.io-client' {
  export type Socket = {
    on(event: string, listener: (payload: unknown) => void): void;
    emit(event: string, payload?: unknown, ack?: (response: Record<string, unknown>) => void): void;
    removeAllListeners(): void;
    disconnect(): void;
  };

  export function io(url: string, options?: Record<string, unknown>): Socket;
}

declare module 'react-native-webrtc' {
  import type { ComponentType } from 'react';

  export type MediaStreamTrack = {
    enabled: boolean;
    stop(): void;
  };

  export type MediaStream = {
    getTracks(): MediaStreamTrack[];
    getAudioTracks(): MediaStreamTrack[];
  };

  export type RTCSessionDescriptionInit = {
    type?: string;
    sdp?: string;
  };

  export type RTCIceCandidateInit = {
    candidate?: string;
    sdpMid?: string | null;
    sdpMLineIndex?: number | null;
    usernameFragment?: string | null;
  };

  export class RTCSessionDescription {
    constructor(init: RTCSessionDescriptionInit);
    toJSON(): RTCSessionDescriptionInit;
  }

  export class RTCIceCandidate {
    constructor(init: RTCIceCandidateInit);
    toJSON(): RTCIceCandidateInit;
  }

  export type RTCIceCandidateEvent = {
    candidate: RTCIceCandidate | null;
  };

  export type RTCRtpSender = {
    track?: MediaStreamTrack | null;
  };

  export class RTCPeerConnection {
    constructor(config?: Record<string, unknown>);
    connectionState: string;
    remoteDescription?: RTCSessionDescription | RTCSessionDescriptionInit | null;
    onicecandidate: ((event: RTCIceCandidateEvent) => void) | null;
    onconnectionstatechange: (() => void) | null;
    addTrack(track: MediaStreamTrack, stream: MediaStream): void;
    createOffer(options?: Record<string, unknown>): Promise<RTCSessionDescription>;
    createAnswer(): Promise<RTCSessionDescription>;
    setLocalDescription(description: RTCSessionDescription): Promise<void>;
    setRemoteDescription(description: RTCSessionDescription): Promise<void>;
    addIceCandidate(candidate: RTCIceCandidate): Promise<void>;
    getSenders(): RTCRtpSender[];
    close(): void;
  }

  export const mediaDevices: {
    getUserMedia(constraints: Record<string, unknown>): Promise<MediaStream>;
  };

  export const RTCView: ComponentType<Record<string, unknown>>;
  export const RTCPIPView: ComponentType<Record<string, unknown>>;
  export function startIOSPIP(ref: { current: unknown } | null): void;
  export function stopIOSPIP(ref: { current: unknown } | null): void;
}

declare module 'react-native-video' {
  import type { ComponentType } from 'react';

  export type VideoRef = {
    seek(time: number): void;
    pause(): void;
    resume(): void;
  };

  export type OnLoadData = {
    duration: number;
    naturalSize: { width: number; height: number; orientation: string };
    audioTracks?: Array<{ index: number; title?: string; language?: string; type?: string }>;
    textTracks?: Array<{ index: number; title?: string; language?: string; type?: string }>;
  };

  export type OnBufferData = {
    isBuffering: boolean;
  };

  export type OnVideoErrorData = {
    error: {
      localizedDescription?: string;
      localizedFailureReason?: string;
      localizedRecoverySuggestion?: string;
      code?: number;
      domain?: string;
    };
    target?: number;
  };

  export type OnProgressData = {
    currentTime: number;
    playableDuration: number;
    seekableDuration: number;
  };

  export type OnEndData = Record<string, unknown>;

  type ResizeMode = 'none' | 'contain' | 'cover' | 'stretch';

  export type VideoProps = {
    source:
      | {
          uri: string;
          type?: string;
          headers?: Record<string, string>;
          isNetwork?: boolean;
        }
      | number;
    style?: Record<string, unknown>;
    resizeMode?: ResizeMode;
    controls?: boolean;
    paused?: boolean;
    ignoreSilentSwitch?: 'inherit' | 'ignore' | 'obey';
    progressUpdateInterval?: number;
    onLoad?: (data: OnLoadData) => void;
    onBuffer?: (data: OnBufferData) => void;
    onError?: (error: OnVideoErrorData) => void;
    onEnd?: (data: OnEndData) => void;
    onProgress?: (data: OnProgressData) => void;
    ref?: { current: VideoRef | null };
  };

  const Video: ComponentType<VideoProps>;
  export default Video;
}

declare module 'react-native-screens' {
  import type { ComponentType } from 'react';

  /**
   * Renders children at the UIWindow root level — above all native navigation
   * screens — without creating a separate UIWindow (unlike RN Modal).
   * This is the correct way to overlay content over react-native-screens stacks
   * while keeping AVPlayerLayer in the main UIWindow for react-native-video.
   */
  export const FullWindowOverlay: ComponentType<{ children?: unknown }>;
}

declare module 'react-native-gesture-handler' {
  import type { ComponentType } from 'react';

  export const GestureHandlerRootView: ComponentType<Record<string, unknown>>;
  export const Swipeable: ComponentType<Record<string, unknown>>;
}

/**
 * @telegram/ui — resolved from packages/ui/src via tsconfig paths.
 * Type stubs removed in Phase 9 migration; tsc now reads the real source.
 */
