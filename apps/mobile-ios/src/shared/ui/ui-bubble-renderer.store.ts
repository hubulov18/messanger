import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export type UiBubbleRendererMode = 'system' | 'real' | 'old';

type UiBubbleRendererState = {
  mode: UiBubbleRendererMode;
  setMode: (mode: UiBubbleRendererMode) => void;
  cycleMode: () => void;
};

const MODE_SEQUENCE: UiBubbleRendererMode[] = ['system', 'real', 'old'];

export const useUiBubbleRendererStore = create<UiBubbleRendererState>(
  persist<UiBubbleRendererState>(
    (set) => ({
      mode: 'system',
      setMode: (mode) => set({ mode }),
      cycleMode: () => {
        set((state) => {
          const currentIndex = MODE_SEQUENCE.indexOf(state.mode);
          const nextMode = MODE_SEQUENCE[(currentIndex + 1) % MODE_SEQUENCE.length] ?? 'system';
          return { mode: nextMode };
        });
      },
    }),
    {
      name: 'mobile-ios-bubble-renderer',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state: UiBubbleRendererState) => ({
        mode: state.mode,
      }),
    },
  ),
);

export function resolveUseRealUiBubbles(params: {
  envEnabled: boolean;
  mode: UiBubbleRendererMode;
}) {
  const { envEnabled, mode } = params;

  if (mode === 'real') {
    return true;
  }

  if (mode === 'old') {
    return false;
  }

  return envEnabled;
}

export function describeUiBubbleRendererMode(params: {
  mode: UiBubbleRendererMode;
  resolvedUseRealUiBubbles: boolean;
}) {
  if (params.mode === 'system') {
    return `System (${params.resolvedUseRealUiBubbles ? 'real' : 'old'})`;
  }

  return params.mode === 'real' ? 'Forced real' : 'Forced old';
}
