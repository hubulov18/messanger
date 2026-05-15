import { NavigationContainer } from '@react-navigation/native';
import type { PropsWithChildren } from 'react';

import { markNavigationReady, navigationRef } from './navigation-service';

export function AppNavigationProvider({ children }: PropsWithChildren) {
  return (
    <NavigationContainer ref={navigationRef} onReady={markNavigationReady}>
      {children}
    </NavigationContainer>
  );
}
