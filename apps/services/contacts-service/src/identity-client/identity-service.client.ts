import { Injectable, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class IdentityServiceClient {
  constructor(private readonly configService: ConfigService) {}

  async findContactMatches(normalizedHashes: string[]): Promise<Map<string, string>> {
    if (normalizedHashes.length === 0) {
      return new Map();
    }

    const baseUrl = this.configService.get<string>('services.identityServiceUrl') ?? 'http://localhost:3001';
    const response = await fetch(`${baseUrl}/v1/internal/contacts/matches`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ hashes: normalizedHashes }),
    });

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to match imported contacts');
    }

    const payload = (await response.json()) as {
      matches: Array<{ normalizedHash: string; userId: string }>;
    };

    return new Map(payload.matches.map((match) => [match.normalizedHash, match.userId]));
  }
}
