import { createNavigationContainerRef } from '@react-navigation/core';

type RootParamList = {
  MainTabs: undefined;
  ChatThread: { chatId: string; initialSearchQuery?: string };
  CreateGroup: undefined;
};

export const navigationRef = createNavigationContainerRef<RootParamList>();
let pendingChatThreadParams: RootParamList['ChatThread'] | null = null;

function flushPendingNavigation() {
  if (!navigationRef.isReady() || !pendingChatThreadParams) {
    return;
  }

  const params = pendingChatThreadParams;
  pendingChatThreadParams = null;
  navigationRef.navigate('ChatThread', params);
}

export function markNavigationReady() {
  flushPendingNavigation();
}

export function navigateToChatThread(chatId: string, options?: { initialSearchQuery?: string }) {
  const params: RootParamList['ChatThread'] = {
    chatId,
    ...(options?.initialSearchQuery ? { initialSearchQuery: options.initialSearchQuery } : {}),
  };

  if (navigationRef.isReady()) {
    navigationRef.navigate('ChatThread', params);
    return;
  }

  pendingChatThreadParams = params;
}
