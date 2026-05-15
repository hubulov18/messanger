import { createContext, useContext, useMemo, type PropsWithChildren } from 'react';
import { buildTheme, type Theme, type ThemeMode } from './tokens';

/**
 * Theme provider and hooks.
 *
 * The theme object is memoized by mode — consumers re-render only when mode
 * flips. `useColors` is a narrow selector to avoid pulling the whole theme
 * into hot components like ChatBubble.
 */

const ThemeContext = createContext<Theme | null>(null);

export interface ThemeProviderProps {
  readonly mode: ThemeMode;
}

export function ThemeProvider({ mode, children }: PropsWithChildren<ThemeProviderProps>) {
  const theme = useMemo(() => buildTheme(mode), [mode]);
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme(): Theme {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error('useTheme must be used inside <ThemeProvider>.');
  }
  return theme;
}

export function useColors(): Theme['colors'] {
  return useTheme().colors;
}
