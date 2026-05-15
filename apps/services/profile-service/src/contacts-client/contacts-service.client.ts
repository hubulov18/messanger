import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ContactsServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async isMatchedContact(ownerUserId: string, candidateUserId: string): Promise<boolean> {
    const baseUrl = this.configService.get<string>('services.contactsServiceUrl') ?? 'http://localhost:3005';
    const params = new URLSearchParams({ candidateUserId });
    const response = await fetch(`${baseUrl}/v1/internal/contacts/${ownerUserId}/is-contact?${params.toString()}`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to verify contact relationship');
    }

    const payload = (await response.json()) as { isContact: boolean };
    return payload.isContact;
  }
}
