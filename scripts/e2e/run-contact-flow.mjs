const baseUrl = process.env.API_BASE_URL ?? 'http://localhost:3000/v1';
const phoneNumber = process.env.SEED_OWNER_PHONE_NUMBER ?? '+14155552671';
const deviceId = process.env.SEED_DEVICE_ID ?? 'device_seed_ios';
const importPayload = {
  contacts: [
    {
      normalizedHash: process.env.SEED_MATCHED_PHONE_HASH ?? '914a4339de282aeb70b17daa615f3e931dfe383784cda1b13ed7d00e47b88e50',
      displayName: process.env.SEED_MATCHED_DISPLAY_NAME ?? 'Seed Match',
    },
  ],
};

async function request(path, init = {}) {
  const response = await fetch(`${baseUrl}${path}`, init);
  const text = await response.text();
  const body = text ? JSON.parse(text) : null;
  if (!response.ok) {
    throw new Error(JSON.stringify({ status: response.status, body }, null, 2));
  }
  return body;
}

const register = await request('/auth/register', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({ phoneNumber }),
});

const verify = await request('/auth/verify-otp', {
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    challengeId: register.challengeId,
    code: '123456',
    deviceId,
    clientType: 'ios',
  }),
});

const authHeaders = {
  'content-type': 'application/json',
  authorization: `Bearer ${verify.accessToken}`,
  'x-device-id': deviceId,
};

const imported = await request('/contacts/import', {
  method: 'POST',
  headers: authHeaders,
  body: JSON.stringify(importPayload),
});

const contacts = await request('/contacts', {
  method: 'GET',
  headers: authHeaders,
});

console.log(JSON.stringify({
  register,
  verify: {
    user: verify.user,
    accessTokenIssued: typeof verify.accessToken === 'string' && verify.accessToken.length > 0,
  },
  imported,
  contacts,
}, null, 2));
