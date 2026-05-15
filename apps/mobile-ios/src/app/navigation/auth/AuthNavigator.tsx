import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { OtpVerificationScreen } from '@features/auth/screens/OtpVerificationScreen';
import { PhoneEntryScreen } from '@features/auth/screens/PhoneEntryScreen';
import { ProfileSetupScreen } from '@features/auth/screens/ProfileSetupScreen';
import { useSessionStore, type AuthFlowStep } from '@shared/auth/session.store';
import { t } from '@shared/i18n';

type AuthStackParamList = {
  PhoneEntry: undefined;
  OtpVerification: {
    phoneNumber: string;
    challengeId: string;
  };
  ProfileSetup: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthNavigator() {
  const authFlowStep = useSessionStore((state: {
    authFlowStep: AuthFlowStep;
  }) => state.authFlowStep);
  const pendingChallenge = useSessionStore((state: {
    pendingChallenge: { challengeId: string; phoneNumber: string; expiresAt: string } | null;
  }) => state.pendingChallenge);

  return (
    <Stack.Navigator>
      {authFlowStep === 'profile_setup' ? (
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} options={{ title: t('auth.profile.title') }} />
      ) : authFlowStep === 'code_verification' && pendingChallenge ? (
        <Stack.Screen name="OtpVerification" component={OtpVerificationScreen} options={{ title: t('auth.otp.title') }} />
      ) : (
        <Stack.Screen name="PhoneEntry" component={PhoneEntryScreen} options={{ title: t('auth.splash.sign_in') }} />
      )}
    </Stack.Navigator>
  );
}
