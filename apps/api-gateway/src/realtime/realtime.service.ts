import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

export type RealtimePayload =
  | {
      type: 'chat.message_created';
      chatId: string;
      messageId?: string;
      clientMessageId?: string;
      senderUserId?: string;
      preview?: string;
      createdAt?: string;
    }
  | {
      type: 'chat.message_updated';
      chatId: string;
      messageId?: string;
      senderUserId?: string;
      messageStatus?: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
      updateKind?: 'edited' | 'deleted' | 'status';
      text?: string;
      editedAt?: string;
      deletedAt?: string;
      preview?: string;
    }
  | {
      type: 'chat.read_updated';
      chatId: string;
      userId?: string;
      lastReadMessageId?: string;
    }
  | {
      type: 'chat.typing_started';
      chatId: string;
      senderUserId: string;
    }
  | {
      type: 'chat.typing_stopped';
      chatId: string;
      senderUserId: string;
    };

type RealtimeMessageEvent = {
  data: RealtimePayload;
};

type Subscriber = {
  next: (value: RealtimeMessageEvent) => void;
};

@Injectable()
export class RealtimeService {
  private readonly subscribersByUserId = new Map<string, Set<Subscriber>>();

  createUserStream(userId: string) {
    return new Observable<RealtimeMessageEvent>((subscriber) => {
      const bucket = this.subscribersByUserId.get(userId) ?? new Set<Subscriber>();
      bucket.add(subscriber);
      this.subscribersByUserId.set(userId, bucket);

      subscriber.next({ data: { type: 'chat.read_updated', chatId: '__connected__' } });

      return () => {
        const currentBucket = this.subscribersByUserId.get(userId);
        if (!currentBucket) {
          return;
        }

        currentBucket.delete(subscriber);
        if (currentBucket.size === 0) {
          this.subscribersByUserId.delete(userId);
        }
      };
    });
  }

  emitToUsers(userIds: string[], payload: RealtimePayload) {
    for (const userId of userIds) {
      const subscribers = this.subscribersByUserId.get(userId);
      if (!subscribers || subscribers.size === 0) {
        continue;
      }

      for (const subscriber of subscribers) {
        subscriber.next({ data: payload });
      }
    }
  }
}
