import { useEffect } from 'react';

import { bootstrapSession } from '@shared/auth/session.bootstrap';
import { setupHaptics } from '@shared/haptics/setupHaptics';
import { AppProviders } from '../providers/AppProviders';
import { RootNavigator } from '../navigation/RootNavigator';

// Wire host haptic implementation before any UI renders.
setupHaptics();

export function AppBootstrap() {
  useEffect(() => {
    void bootstrapSession();
  }, []);

  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
