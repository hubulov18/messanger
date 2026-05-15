import { Injectable } from '@nestjs/common';
import { OutboxEventStatus } from '../../generated/prisma/client.js';
import { randomUUID } from 'node:crypto';

import { PrismaService } from '../../prisma/prisma.service.js';

type OutboxWriter = {
  outboxEvent: {
    create: (args: {
      data: {
        id: string;
        eventType: string;
        eventVersion: number;
        aggregateId: string;
        partitionKey: string;
        payloadJson: object;
        occurredAt: Date;
        status: OutboxEventStatus;
      };
    }) => Promise<unknown>;
  };
};

@Injectable()
export class ContactsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async importContacts(params: {
    ownerUserId: string;
    importedAt: Date;
    contacts: Array<{
      normalizedHash: string;
      phoneNumber: string;
      displayName: string;
      matchedUserId: string | null;
    }>;
  }): Promise<{ matchedCount: number }> {
    return this.prisma.$transaction(async (tx) => {
      await tx.contactBook.upsert({
        where: { ownerUserId: params.ownerUserId },
        update: {
          lastImportedAt: params.importedAt,
          version: {
            increment: 1,
          },
        },
        create: {
          ownerUserId: params.ownerUserId,
          lastImportedAt: params.importedAt,
          version: 1,
        },
      });

      let matchedCount = 0;

      for (const contact of params.contacts) {
        const existing = await tx.importedContact.findUnique({
          where: {
            ownerUserId_normalizedHash: {
              ownerUserId: params.ownerUserId,
              normalizedHash: contact.normalizedHash,
            },
          },
          select: {
            id: true,
            matchedUserId: true,
          },
        });

        if (existing) {
          await tx.importedContact.update({
            where: { id: existing.id },
            data: {
              phoneNumber: contact.phoneNumber,
              displayName: contact.displayName,
              matchedUserId: contact.matchedUserId,
            },
          });
        } else {
          await tx.importedContact.create({
            data: {
              id: `contact_${randomUUID()}`,
              ownerUserId: params.ownerUserId,
              normalizedHash: contact.normalizedHash,
              phoneNumber: contact.phoneNumber,
              displayName: contact.displayName,
              matchedUserId: contact.matchedUserId,
            },
          });
        }

        if (contact.matchedUserId) {
          matchedCount += 1;
        }

        if (contact.matchedUserId && existing?.matchedUserId !== contact.matchedUserId) {
          await this.writeOutboxEvent(tx, {
            eventType: 'contacts.contact_matched',
            aggregateId: `${params.ownerUserId}:${contact.normalizedHash}`,
            partitionKey: params.ownerUserId,
            payloadJson: {
              ownerUserId: params.ownerUserId,
              normalizedHash: contact.normalizedHash,
              matchedUserId: contact.matchedUserId,
              matchedAt: params.importedAt.toISOString(),
            },
            occurredAt: params.importedAt,
          });
        }
      }

      await this.writeOutboxEvent(tx, {
        eventType: 'contacts.contacts_imported',
        aggregateId: params.ownerUserId,
        partitionKey: params.ownerUserId,
        payloadJson: {
          ownerUserId: params.ownerUserId,
          importedCount: params.contacts.length,
          matchedCount,
          importedAt: params.importedAt.toISOString(),
        },
        occurredAt: params.importedAt,
      });

      return { matchedCount };
    });
  }

  async listMatchedContacts(ownerUserId: string) {
    return this.prisma.importedContact.findMany({
      where: {
        ownerUserId,
        matchedUserId: {
          not: null,
        },
      },
      orderBy: {
        displayName: 'asc',
      },
      select: {
        matchedUserId: true,
        phoneNumber: true,
        displayName: true,
      },
    });
  }

  async hasMatchedContact(ownerUserId: string, matchedUserId: string) {
    const contact = await this.prisma.importedContact.findFirst({
      where: {
        ownerUserId,
        matchedUserId,
      },
      select: {
        id: true,
      },
    });

    return Boolean(contact);
  }

  async saveMatchedContact(params: {
    ownerUserId: string;
    matchedUserId: string;
    displayName: string;
    phoneNumber?: string | null;
  }) {
    const occurredAt = new Date();
    const normalizedHash = `manual:${params.matchedUserId}`;

    return this.prisma.$transaction(async (tx) => {
      await tx.contactBook.upsert({
        where: { ownerUserId: params.ownerUserId },
        update: {
          lastImportedAt: occurredAt,
          version: {
            increment: 1,
          },
        },
        create: {
          ownerUserId: params.ownerUserId,
          lastImportedAt: occurredAt,
          version: 1,
        },
      });

      const existing = await tx.importedContact.findUnique({
        where: {
          ownerUserId_normalizedHash: {
            ownerUserId: params.ownerUserId,
            normalizedHash,
          },
        },
        select: {
          id: true,
          matchedUserId: true,
        },
      });

      const data = {
        phoneNumber: params.phoneNumber ?? null,
        displayName: params.displayName,
        matchedUserId: params.matchedUserId,
      };

      if (existing) {
        await tx.importedContact.update({
          where: { id: existing.id },
          data,
        });
      } else {
        await tx.importedContact.create({
          data: {
            id: `contact_${randomUUID()}`,
            ownerUserId: params.ownerUserId,
            normalizedHash,
            ...data,
          },
        });
      }

      if (existing?.matchedUserId !== params.matchedUserId) {
        await this.writeOutboxEvent(tx, {
          eventType: 'contacts.contact_matched',
          aggregateId: `${params.ownerUserId}:${normalizedHash}`,
          partitionKey: params.ownerUserId,
          payloadJson: {
            ownerUserId: params.ownerUserId,
            normalizedHash,
            matchedUserId: params.matchedUserId,
            matchedAt: occurredAt.toISOString(),
          },
          occurredAt,
        });
      }

      return {
        matchedUserId: params.matchedUserId,
        displayName: params.displayName,
        phoneNumber: params.phoneNumber ?? null,
      };
    });
  }

  private writeOutboxEvent(
    tx: OutboxWriter,
    params: {
      eventType: string;
      aggregateId: string;
      partitionKey: string;
      payloadJson: object;
      occurredAt: Date;
    },
  ) {
    return tx.outboxEvent.create({
      data: {
        id: `evt_${randomUUID()}`,
        eventType: params.eventType,
        eventVersion: 1,
        aggregateId: params.aggregateId,
        partitionKey: params.partitionKey,
        payloadJson: params.payloadJson,
        occurredAt: params.occurredAt,
        status: OutboxEventStatus.pending,
      },
    });
  }
}
