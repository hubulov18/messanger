import { Injectable } from '@nestjs/common';

import type { CurrentUser } from '../auth/current-user.type.js';
import { IdentityServiceClient } from '../identity-client/identity-service.client.js';
import { ProfileServiceClient } from '../profile-client/profile-service.client.js';
import type { ImportContactsDto } from './dto/import-contacts.dto.js';
import { ContactsRepository } from './repositories/contacts.repository.js';

@Injectable()
export class ContactsService {
  constructor(
    private readonly contactsRepository: ContactsRepository,
    private readonly identityServiceClient: IdentityServiceClient,
    private readonly profileServiceClient: ProfileServiceClient,
  ) {}

  async importContacts(currentUser: CurrentUser, body: ImportContactsDto) {
    const uniqueContacts = [...new Map(
      body.contacts.map((contact) => [contact.normalizedHash.trim(), {
        normalizedHash: contact.normalizedHash.trim(),
        phoneNumber: contact.phoneNumber.trim(),
        displayName: contact.displayName.trim(),
      }]),
    ).values()].filter((contact) => contact.normalizedHash.length > 0);

    const matches = await this.identityServiceClient.findContactMatches(
      uniqueContacts.map((contact) => contact.normalizedHash),
    );

    const result = await this.contactsRepository.importContacts({
      ownerUserId: currentUser.userId,
      importedAt: new Date(),
      contacts: uniqueContacts.map((contact) => ({
        ...contact,
        matchedUserId: matches.get(contact.normalizedHash) ?? null,
      })),
    });

    return {
      success: true,
      matchedCount: result.matchedCount,
    };
  }

  async listContacts(currentUser: CurrentUser) {
    const contacts = await this.contactsRepository.listMatchedContacts(currentUser.userId);

    const items = await Promise.all(
      contacts.map(async (contact) => {
        const userId = contact.matchedUserId;
        if (!userId || userId === currentUser.userId) {
          return null;
        }

        const profile = await this.profileServiceClient.getProfileByUserId(userId);
        return {
          userId,
          displayName: profile?.displayName ?? contact.displayName,
          phoneNumber: contact.phoneNumber ?? null,
          username: profile?.username ?? null,
          avatarMediaId: profile?.avatarMediaId ?? null,
        };
      }),
    );

    return {
      items: items.filter((item): item is NonNullable<typeof item> => item !== null),
    };
  }

  async saveMatchedContact(currentUser: CurrentUser, userId: string) {
    if (userId === currentUser.userId) {
      return {
        success: true,
        item: null,
      };
    }

    const profile = await this.profileServiceClient.getProfileByUserId(userId);

    if (!profile) {
      return {
        success: false,
        item: null,
      };
    }

    const contact = await this.contactsRepository.saveMatchedContact({
      ownerUserId: currentUser.userId,
      matchedUserId: userId,
      displayName: profile.displayName,
      phoneNumber: null,
    });

    return {
      success: true,
      item: {
        userId,
        displayName: contact.displayName,
        phoneNumber: contact.phoneNumber,
        username: profile.username ?? null,
        avatarMediaId: profile.avatarMediaId ?? null,
      },
    };
  }

  async isMatchedContact(ownerUserId: string, candidateUserId: string) {
    return {
      isContact: await this.contactsRepository.hasMatchedContact(ownerUserId, candidateUserId),
    };
  }
}
