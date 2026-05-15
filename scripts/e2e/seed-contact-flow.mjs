import { createRequire } from 'node:module';
import { randomUUID } from 'node:crypto';

import { hashContactPhoneNumber, normalizeContactPhoneNumber } from '../../packages/shared/dist/index.js';

const require = createRequire(import.meta.url);
const { PrismaClient: IdentityPrisma } = require('../../apps/services/identity-service/src/generated/prisma');
const { PrismaClient: ProfilePrisma } = require('../../apps/services/profile-service/src/generated/prisma');
console.log(process.env.IDENTITY_DATABASE_URL);
console.log(process.env.PROFILE_DATABASE_URL);
const identityDatabaseUrl = process.env.IDENTITY_DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/telegram_identity';
const profileDatabaseUrl = process.env.PROFILE_DATABASE_URL ?? 'postgresql://postgres:postgres@localhost:5432/telegram_profile';

const identityPrisma = new IdentityPrisma({
  datasources: {
    db: {
      url: identityDatabaseUrl,
    },
  },
});

const profilePrisma = new ProfilePrisma({
  datasources: {
    db: {
      url: profileDatabaseUrl,
    },
  },
});

const ownerUserId = process.env.SEED_OWNER_USER_ID ?? 'user_seed_owner';
const ownerPhoneNumber = normalizeContactPhoneNumber(process.env.SEED_OWNER_PHONE_NUMBER ?? '+1 (555) 000-0001');
const ownerUsername = process.env.SEED_OWNER_USERNAME ?? 'seed_owner';
const ownerDisplayName = process.env.SEED_OWNER_DISPLAY_NAME ?? 'Seed Owner';

const matchedUserId = process.env.SEED_MATCHED_USER_ID ?? 'user_seed_match';
const matchedPhoneNumber = normalizeContactPhoneNumber(process.env.SEED_MATCHED_PHONE_NUMBER ?? '+1 (555) 000-0002');
const matchedUsername = process.env.SEED_MATCHED_USERNAME ?? 'seed_match';
const matchedDisplayName = process.env.SEED_MATCHED_DISPLAY_NAME ?? 'Seed Match';

const matchedPhoneHash = hashContactPhoneNumber(matchedPhoneNumber);

async function main() {
  const verifiedAt = new Date();

  await identityPrisma.userAccount.upsert({
    where: { id: ownerUserId },
    update: {
      phoneNumber: ownerPhoneNumber,
      phoneNumberHash: hashContactPhoneNumber(ownerPhoneNumber),
      status: 'active',
      verifiedAt,
    },
    create: {
      id: ownerUserId,
      phoneNumber: ownerPhoneNumber,
      phoneNumberHash: hashContactPhoneNumber(ownerPhoneNumber),
      status: 'active',
      verifiedAt,
    },
  });

  await identityPrisma.userAccount.upsert({
    where: { id: matchedUserId },
    update: {
      phoneNumber: matchedPhoneNumber,
      phoneNumberHash: matchedPhoneHash,
      status: 'active',
      verifiedAt,
    },
    create: {
      id: matchedUserId,
      phoneNumber: matchedPhoneNumber,
      phoneNumberHash: matchedPhoneHash,
      status: 'active',
      verifiedAt,
    },
  });

  await profilePrisma.userProfile.upsert({
    where: { userId: ownerUserId },
    update: {
      username: ownerUsername,
      displayName: ownerDisplayName,
    },
    create: {
      userId: ownerUserId,
      username: ownerUsername,
      displayName: ownerDisplayName,
    },
  });

  await profilePrisma.userProfile.upsert({
    where: { userId: matchedUserId },
    update: {
      username: matchedUsername,
      displayName: matchedDisplayName,
    },
    create: {
      userId: matchedUserId,
      username: matchedUsername,
      displayName: matchedDisplayName,
    },
  });

  const payload = {
    contacts: [
      {
        normalizedHash: matchedPhoneHash,
        displayName: matchedDisplayName,
      },
    ],
  };

  console.log(JSON.stringify({
    seededAt: verifiedAt.toISOString(),
    ownerUser: {
      id: ownerUserId,
      phoneNumber: ownerPhoneNumber,
      username: ownerUsername,
    },
    matchedUser: {
      id: matchedUserId,
      phoneNumber: matchedPhoneNumber,
      phoneHash: matchedPhoneHash,
      username: matchedUsername,
    },
    importPayload: payload,
    nextStep: {
      path: 'POST /contacts/import',
      note: 'Authenticate as ownerUser and send importPayload through the API gateway or contacts-service directly.',
    },
  }, null, 2));
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await Promise.allSettled([
      identityPrisma.$disconnect(),
      profilePrisma.$disconnect(),
    ]);
  });
