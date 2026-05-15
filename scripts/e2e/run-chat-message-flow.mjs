const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000/v1';
const ownerPhoneNumber = process.env.SEED_OWNER_PHONE_NUMBER ?? '+14155552671';
const peerPhoneNumber = process.env.SEED_MATCHED_PHONE_NUMBER ?? '+14155552672';
const ownerDeviceId = 'device_owner_chat';
const peerDeviceId = 'device_peer_chat';

async function request(path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(JSON.stringify({ status: response.status, body }, null, 2));
  }
  return body;
}

async function authenticate(phoneNumber, deviceId) {
  const register = await request('/auth/register', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ phoneNumber }),
  });

  const verify = await request('/auth/verify-otp', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      challengeId: register.challengeId,
      code: '123456',
      deviceId,
      clientType: 'ios',
    }),
  });

  return {
    user: verify.user,
    accessToken: verify.accessToken,
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${verify.accessToken}`,
      'x-device-id': deviceId,
    },
  };
}

const owner = await authenticate(ownerPhoneNumber, ownerDeviceId);
const peer = await authenticate(peerPhoneNumber, peerDeviceId);

await request(`/me/blocks/${peer.user.id}`, {
  method: 'DELETE',
  headers: owner.headers,
});

const directChat = await request('/chats/direct', {
  method: 'POST',
  headers: owner.headers,
  body: JSON.stringify({
    participantUserId: peer.user.id,
  }),
});

const chatId = directChat.chat.id;
const clientMessageId = `cmid_${Date.now()}`;

const sent = await request('/messages', {
  method: 'POST',
  headers: owner.headers,
  body: JSON.stringify({
    chatId,
    clientMessageId,
    type: 'text',
    text: 'hello from smoke test',
    attachments: [],
  }),
});

const messages = await request(`/chats/${chatId}/messages?limit=20`, {
  method: 'GET',
  headers: owner.headers,
});

await request(`/me/blocks/${peer.user.id}`, {
  method: 'POST',
  headers: owner.headers,
});

let blockedSend;
try {
  await request('/messages', {
    method: 'POST',
    headers: owner.headers,
    body: JSON.stringify({
      chatId,
      clientMessageId: `${clientMessageId}_blocked`,
      type: 'text',
      text: 'this should be blocked',
      attachments: [],
    }),
  });
  blockedSend = { unexpected: true };
} catch (error) {
  blockedSend = JSON.parse(error.message);
}

await request(`/me/blocks/${peer.user.id}`, {
  method: 'DELETE',
  headers: owner.headers,
});

console.log(JSON.stringify({
  owner: owner.user,
  peer: peer.user,
  directChat,
  sent,
  messageCount: messages.items.length,
  blockedSend,
}, null, 2));
