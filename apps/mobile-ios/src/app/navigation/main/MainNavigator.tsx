import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { CreateChannelScreen } from '@features/chats/screens/CreateChannelScreen';
import { CreateGroupScreen } from '@features/chats/screens/CreateGroupScreen';
import { AddChatMembersScreen } from '@features/chats/screens/AddChatMembersScreen';
import { ChatInfoScreen } from '@features/chats/screens/ChatInfoScreen';
import { ChatListScreen } from '@features/chats/screens/ChatListScreen';
import { EditChatScreen } from '@features/chats/screens/EditChatScreen';
import { GlobalSearchScreen } from '@features/chats/screens/GlobalSearchScreen';
import { InviteLinksScreen } from '@features/chats/screens/InviteLinksScreen';
import { JoinChatScreen } from '@features/chats/screens/JoinChatScreen';
import { ContactsScreen } from '@features/contacts/screens/ContactsScreen';
import { ChatThreadScreen } from '@features/messages/screens/ChatThreadScreen';
import { VideoPlayerScreen } from '@features/messages/screens/VideoPlayerScreen';
import { UserProfileViewScreen } from '@features/profile/screens/UserProfileViewScreen';
import { SettingsStack } from '@features/settings/navigation/SettingsStack';
import { useChatUnreadStore } from '@shared/chats/chat-unread.store';
import { telegramColors, telegramLayout, telegramShadows } from '@shared/ui/ios/theme';

type RootStackParamList = {
  MainTabs: undefined;
  ChatThread: { chatId: string; initialSearchQuery?: string };
  ChatInfo: { chatId: string };
  UserProfileView: {
    userId: string;
    chatId?: string;
    displayName?: string;
    username?: string | null;
    avatarMediaId?: string | null;
    phoneNumber?: string | null;
  };
  AddChatMembers: { chatId: string };
  EditChat: { chatId: string };
  InviteLinks: { chatId: string };
  JoinChat: undefined;
  GlobalSearch: undefined;
  CreateGroup: undefined;
  CreateChannel: undefined;
  VideoPlayer: {
    videoUrl: string;
    mimeType?: string;
    title?: string;
    caption?: string | null;
  };
};

type MainTabsParamList = {
  Contacts: undefined;
  Chats: undefined;
  Settings: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();
const Tabs = createBottomTabNavigator<MainTabsParamList>();

const TAB_CONFIG: Record<keyof MainTabsParamList, { icon: string; label: string }> = {
  Chats: { icon: '💬', label: 'Chats' },
  Contacts: { icon: '👥', label: 'Contacts' },
  Settings: { icon: '⚙️', label: 'Settings' },
};

function MainTabBar({ state, descriptors, navigation }: any) {
  const totalUnreadCount = useChatUnreadStore((store) => store.totalUnreadCount);

  return (
    <View style={styles.tabBarShell}>
      <View style={styles.tabBar}>
        {state.routes.map((route: { key: string; name: keyof MainTabsParamList }, index: number) => {
          const focused = state.index === index;
          const { options } = descriptors[route.key];
          const config = TAB_CONFIG[route.name];
          const label = config?.label ?? options.title ?? route.name;
          const showBadge = route.name === 'Chats' && totalUnreadCount > 0;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!focused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <Pressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={focused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onLongPress={onLongPress}
              onPress={onPress}
              style={styles.tabButton}
            >
              <View style={styles.tabIconWrap}>
                <Text style={[styles.tabIcon, focused ? styles.tabIconActive : styles.tabIconInactive]}>
                  {config.icon}
                </Text>
                {showBadge ? (
                  <View style={styles.tabBadgeBubble}>
                    <Text style={styles.tabBadgeText}>{formatTabBadge(totalUnreadCount)}</Text>
                  </View>
                ) : null}
              </View>
              <Text style={[styles.tabLabel, focused ? styles.tabLabelActive : styles.tabLabelInactive]}>
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

function MainTabsNavigator() {
  return (
    <Tabs.Navigator
      screenOptions={{
        headerShown: false,
        sceneStyle: {
          backgroundColor: telegramColors.appBackground,
        },
      }}
      tabBar={(props: any) => <MainTabBar {...props} />}
    >
      <Tabs.Screen name="Chats" component={ChatListScreen} options={{ title: 'Chats' }} />
      <Tabs.Screen name="Contacts" component={ContactsScreen} options={{ title: 'Contacts' }} />
      <Tabs.Screen name="Settings" component={SettingsStack} options={{ title: 'Settings' }} />
    </Tabs.Navigator>
  );
}

function formatTabBadge(value: number) {
  return value > 99 ? '99+' : String(value);
}

export function MainNavigator() {
  return (
    <RootStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: telegramColors.appBackground },
      }}
    >
      <RootStack.Screen name="MainTabs" component={MainTabsNavigator} />
      <RootStack.Screen name="ChatThread" component={ChatThreadScreen} />
      <RootStack.Screen name="ChatInfo" component={ChatInfoScreen} />
      <RootStack.Screen name="UserProfileView" component={UserProfileViewScreen} />
      <RootStack.Screen name="AddChatMembers" component={AddChatMembersScreen} />
      <RootStack.Screen name="EditChat" component={EditChatScreen} />
      <RootStack.Screen name="InviteLinks" component={InviteLinksScreen} />
      <RootStack.Screen name="JoinChat" component={JoinChatScreen} />
      <RootStack.Screen name="GlobalSearch" component={GlobalSearchScreen} />
      <RootStack.Screen name="CreateGroup" component={CreateGroupScreen} />
      <RootStack.Screen name="CreateChannel" component={CreateChannelScreen} />
      <RootStack.Screen name="VideoPlayer" component={VideoPlayerScreen} />
    </RootStack.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBarShell: {
    backgroundColor: telegramColors.navBg ?? 'rgba(242,243,247,0.92)',
    borderTopColor: telegramColors.separator,
    borderTopWidth: telegramLayout.hairlineWidth,
    paddingBottom: 4,
  },
  tabBar: {
    alignItems: 'stretch',
    backgroundColor: 'rgba(242,243,247,0.92)',
    flexDirection: 'row',
    minHeight: 64,
    paddingBottom: 6,
    paddingHorizontal: 2,
    paddingTop: 8,
  },
  tabButton: {
    alignItems: 'center',
    flex: 1,
    gap: 3,
    justifyContent: 'center',
    paddingHorizontal: 4,
    paddingVertical: 4,
  },
  tabIconWrap: {
    minWidth: 28,
    position: 'relative',
  },
  tabIcon: {
    fontSize: 22,
    textAlign: 'center',
  },
  tabIconActive: {
    opacity: 1,
  },
  tabIconInactive: {
    opacity: 0.55,
  },
  tabLabel: {
    fontSize: 10,
    fontWeight: '700',
  },
  tabLabelActive: {
    color: telegramColors.accent,
  },
  tabLabelInactive: {
    color: telegramColors.textTertiary,
  },
  tabBadgeBubble: {
    alignItems: 'center',
    backgroundColor: telegramColors.unreadBadge,
    borderColor: telegramColors.white,
    borderRadius: 999,
    borderWidth: 2,
    justifyContent: 'center',
    minWidth: 20,
    paddingHorizontal: 4,
    position: 'absolute',
    right: -8,
    top: -3,
    ...telegramShadows.button,
  },
  tabBadgeText: {
    color: telegramColors.white,
    fontSize: 10,
    fontWeight: '800',
  },
});
