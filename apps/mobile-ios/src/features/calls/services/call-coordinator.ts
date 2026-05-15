import type { CallType } from '../api/calls.api';

type CallCoordinatorHandlers = {
  startChatCall: (chatId: string, callType: CallType) => Promise<void>;
  acceptIncomingCall: () => Promise<void>;
  declineIncomingCall: () => Promise<void>;
  endCurrentCall: () => Promise<void>;
  retryCurrentCall: () => Promise<void>;
  toggleMute: () => Promise<void>;
  toggleSpeaker: () => Promise<void>;
  toggleVideo: () => Promise<void>;
};

let handlers: CallCoordinatorHandlers | null = null;

export function registerCallCoordinator(nextHandlers: CallCoordinatorHandlers | null) {
  handlers = nextHandlers;
}

export async function startChatVoiceCall(chatId: string) {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.startChatCall(chatId, 'audio');
}

export async function startChatVideoCall(chatId: string) {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.startChatCall(chatId, 'video');
}

export async function acceptIncomingCall() {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.acceptIncomingCall();
}

export async function declineIncomingCall() {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.declineIncomingCall();
}

export async function endCurrentCall() {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.endCurrentCall();
}

export async function retryCurrentCall() {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.retryCurrentCall();
}

export async function toggleCallMute() {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.toggleMute();
}

export async function toggleCallSpeaker() {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.toggleSpeaker();
}

export async function toggleCallVideo() {
  if (!handlers) {
    throw new Error('Call coordinator is not ready');
  }

  return handlers.toggleVideo();
}
