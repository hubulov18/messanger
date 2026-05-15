import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SplashScreen } from '@features/auth/screens/SplashScreen';
import { useSessionStore } from '@shared/auth/session.store';
import { AuthNavigator } from './auth/AuthNavigator';
import { MainNavigator } from './main/MainNavigator';

type RootStackParamList = {
  Boot: undefined;
  Auth: undefined;
  Main: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  const bootStatus = useSessionStore((state: { bootStatus: 'idle' | 'restoring' | 'ready' }) => state.bootStatus);
  const authStatus = useSessionStore((state: { authStatus: 'anonymous' | 'authenticated' }) => state.authStatus);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {bootStatus !== 'ready' ? (
        <Stack.Screen name="Boot" component={SplashScreen} />
      ) : authStatus === 'authenticated' ? (
        <Stack.Screen name="Main" component={MainNavigator} />
      ) : (
        <Stack.Screen name="Auth" component={AuthNavigator} />
      )}
    </Stack.Navigator>
  );
}
