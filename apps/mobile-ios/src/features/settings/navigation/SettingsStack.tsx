import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { EditProfileScreen } from '@features/profile/screens/EditProfileScreen';
import { UiPreviewChatScreen } from '@features/messages/screens/UiPreviewChatScreen';
import type { AuthSessionItem } from '@features/auth/api/auth.api';
import { AppearanceSettingsScreen } from '../screens/AppearanceSettingsScreen';
import { BlockedUsersScreen } from '../screens/BlockedUsersScreen';
import { DataAndStorageScreen } from '../screens/DataAndStorageScreen';
import { DeveloperSettingsScreen } from '../screens/DeveloperSettingsScreen';
import { DevicesScreen } from '../screens/DevicesScreen';
import { HelpAndAboutScreen } from '../screens/HelpAndAboutScreen';
import { LanguagePickerScreen } from '../screens/LanguagePickerScreen';
import { LanguageChatSettingsScreen } from '../screens/LanguageChatSettingsScreen';
import { NotificationSettingsScreen } from '../screens/NotificationSettingsScreen';
import { NotificationInboxScreen } from '../screens/NotificationInboxScreen';
import { NotificationSoundPickerScreen } from '../screens/NotificationSoundPickerScreen';
import { PrivacySettingsScreen } from '../screens/PrivacySettingsScreen';
import { SessionDetailsScreen } from '../screens/SessionDetailsScreen';
import { SettingsHomeScreen } from '../screens/SettingsHomeScreen';

export type SettingsStackParamList = {
  SettingsHome: undefined;
  EditProfile: undefined;
  PrivacySettings: undefined;
  BlockedUsers: undefined;
  NotificationSettings: undefined;
  NotificationInbox: undefined;
  NotificationSoundPicker: undefined;
  Devices: undefined;
  SessionDetails: { session: AuthSessionItem };
  AppearanceSettings: undefined;
  DataAndStorage: undefined;
  LanguageChatSettings: undefined;
  LanguagePicker: undefined;
  HelpAndAbout: undefined;
  DeveloperSettings: undefined;
  UiPreviewChat: undefined;
};

const Stack = createNativeStackNavigator<SettingsStackParamList>();

export function SettingsStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SettingsHome" component={SettingsHomeScreen} />
      <Stack.Screen name="EditProfile" component={EditProfileScreen} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettingsScreen} />
      <Stack.Screen name="BlockedUsers" component={BlockedUsersScreen} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettingsScreen} />
      <Stack.Screen name="NotificationInbox" component={NotificationInboxScreen} />
      <Stack.Screen name="NotificationSoundPicker" component={NotificationSoundPickerScreen} />
      <Stack.Screen name="Devices" component={DevicesScreen} />
      <Stack.Screen name="SessionDetails" component={SessionDetailsScreen} />
      <Stack.Screen name="AppearanceSettings" component={AppearanceSettingsScreen} />
      <Stack.Screen name="DataAndStorage" component={DataAndStorageScreen} />
      <Stack.Screen name="LanguageChatSettings" component={LanguageChatSettingsScreen} />
      <Stack.Screen name="LanguagePicker" component={LanguagePickerScreen} />
      <Stack.Screen name="HelpAndAbout" component={HelpAndAboutScreen} />
      <Stack.Screen name="DeveloperSettings" component={DeveloperSettingsScreen} />
      <Stack.Screen name="UiPreviewChat" component={UiPreviewChatScreen} />
    </Stack.Navigator>
  );
}
