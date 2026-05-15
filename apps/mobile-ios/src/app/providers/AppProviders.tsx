import { useMemo, type PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ApiClientProvider, ThemeProvider } from '@telegram/ui';

import { env } from '@shared/config/env';
import { I18nProvider } from '@shared/i18n/I18nProvider';
import { createUiApiClient } from '@shared/api/ui-api-client';
import { queryClient } from '@shared/state/queryClient';
import { AppNavigationProvider } from '../navigation/AppNavigationProvider';
import { ChatInboxRealtimeProvider } from './ChatInboxRealtimeProvider';
import { CallsProvider } from './CallsProvider';
import { DeepLinkProvider } from './DeepLinkProvider';
import { InAppNotificationsProvider } from './InAppNotificationsProvider';
import { NotificationRegistrationProvider } from './NotificationRegistrationProvider';
import { RealtimeProvider } from './RealtimeProvider';

/**
 * Provider order (outside-in):
 *   GestureHandlerRootView        — must be the outermost RN view
 *   QueryClientProvider           — single cache, imported as a module-level
 *                                   singleton so non-React consumers (socket
 *                                   worker, auth bootstrap) can share it
 *   ApiClientProvider             — host-supplied ApiClient for @telegram/ui
 *   ThemeProvider                 — design tokens for UI primitives; mode is
 *                                   hard-coded 'light' in Phase 10, system
 *                                   color scheme wiring lands next phase
 *   I18nProvider                  — localization
 *   RealtimeProvider              — socket lifecycle (existing)
 *   NotificationRegistrationProvider, AppNavigationProvider, DeepLinkProvider,
 *   InAppNotificationsProvider, (optional) CallsProvider
 */
export function AppProviders({ children }: PropsWithChildren) {
  // Constructed once per AppProviders mount. The client reads auth state from
  // the session store at call time, so a single instance survives login/logout.
  const apiClient = useMemo(() => createUiApiClient(), []);

  const innerContent = env.features.callsV1 ? (
    <CallsProvider>{children}</CallsProvider>
  ) : (
    children
  );

  return (
    <GestureHandlerRootView style={styles.root}>
      <QueryClientProvider client={queryClient}>
        <ApiClientProvider client={apiClient}>
          <ThemeProvider mode="light">
            <I18nProvider>
              <RealtimeProvider>
                <ChatInboxRealtimeProvider>
                  <NotificationRegistrationProvider>
                    <AppNavigationProvider>
                      <DeepLinkProvider>
                        <InAppNotificationsProvider>{innerContent}</InAppNotificationsProvider>
                      </DeepLinkProvider>
                    </AppNavigationProvider>
                  </NotificationRegistrationProvider>
                </ChatInboxRealtimeProvider>
              </RealtimeProvider>
            </I18nProvider>
          </ThemeProvider>
        </ApiClientProvider>
      </QueryClientProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
});
