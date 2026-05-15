import { Injectable, Logger, ServiceUnavailableException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import type { ChatSummaryProjectionResponseDto } from '@telegram/contracts/internal-api';

export type ChatMessageSummary = {
  chatId: string;
  lastMessagePreview: string | null;
  lastActivityAt: string | null;
  lastSenderUserId: string | null;
  unreadCount: number;
};

@Injectable()
export class MessageServiceClient {
  private readonly logger = new Logger(MessageServiceClient.name);
  private projectionPrimaryReads = 0;
  private projectionPrimaryFallbacks = 0;
  private projectionPrimaryShadowReads = 0;
  private projectionPrimaryShadowMismatches = 0;
  private projectionPrimaryShadowErrors = 0;
  private projectionShadowReads = 0;
  private projectionShadowMismatches = 0;
  private projectionShadowErrors = 0;
  private projectionShadowLastLatencyMs: number | null = null;
  private projectionPrimaryLastLatencyMs: number | null = null;
  private projectionPrimaryShadowLastLatencyMs: number | null = null;

  constructor(private readonly configService: ConfigService) {}

  async getChatSummaries(chatIds: string[], userId: string): Promise<Map<string, ChatMessageSummary>> {
    if (chatIds.length === 0) {
      return new Map();
    }

    if (this.configService.get<boolean>('reads.chatSummaryProjectionEnabled')) {
      return this.getChatSummariesFromProjectionWithFallback(chatIds, userId);
    }

    return this.getChatSummariesFromSource(chatIds, userId);
  }

  getShadowReadMetrics() {
    return {
      totalReads: this.projectionShadowReads,
      mismatches: this.projectionShadowMismatches,
      errors: this.projectionShadowErrors,
      lastLatencyMs: this.projectionShadowLastLatencyMs,
      primaryReads: this.projectionPrimaryReads,
      primaryFallbacks: this.projectionPrimaryFallbacks,
      primaryLastLatencyMs: this.projectionPrimaryLastLatencyMs,
      primaryShadowReads: this.projectionPrimaryShadowReads,
      primaryShadowMismatches: this.projectionPrimaryShadowMismatches,
      primaryShadowErrors: this.projectionPrimaryShadowErrors,
      primaryShadowLastLatencyMs: this.projectionPrimaryShadowLastLatencyMs,
    };
  }

  private async getChatSummariesFromSource(chatIds: string[], userId: string) {
    const baseUrl = this.configService.get<string>('services.messageServiceUrl') ?? 'http://localhost:3003';
    const params = new URLSearchParams({ chatIds: chatIds.join(','), userId });
    const response = await fetch(`${baseUrl}/v1/internal/messages/summaries?${params.toString()}`);

    if (!response.ok) {
      throw new ServiceUnavailableException('Unable to load chat message summaries');
    }

    const payload = (await response.json()) as { items: ChatMessageSummary[] };
    const summaries = new Map(payload.items.map((summary) => [summary.chatId, summary]));
    await this.shadowReadProjection(baseUrl, chatIds, userId, summaries);
    return summaries;
  }

  private async getChatSummariesFromProjectionWithFallback(chatIds: string[], userId: string) {
    const baseUrl = this.configService.get<string>('services.messageServiceUrl') ?? 'http://localhost:3003';
    const params = new URLSearchParams({ chatIds: chatIds.join(','), userId, includeMetadata: 'false' });
    const startedAt = Date.now();

    try {
      const response = await fetch(`${baseUrl}/v1/internal/messages/summaries/projection?${params.toString()}`);
      this.projectionPrimaryReads += 1;
      this.projectionPrimaryLastLatencyMs = Date.now() - startedAt;

      if (!response.ok) {
        this.projectionPrimaryFallbacks += 1;
        this.logger.warn(`Chat summary projection primary read failed with status ${response.status}, falling back`);
        return this.getChatSummariesFromSource(chatIds, userId);
      }

      const payload = (await response.json()) as ChatSummaryProjectionResponseDto;
      const projectionSummaries = new Map(payload.items.map((summary) => [summary.chatId, summary]));
      void this.shadowReadSource(baseUrl, chatIds, userId, projectionSummaries);
      return projectionSummaries;
    } catch (error) {
      this.projectionPrimaryReads += 1;
      this.projectionPrimaryFallbacks += 1;
      this.projectionPrimaryLastLatencyMs = Date.now() - startedAt;
      this.logger.warn(`Chat summary projection primary read threw, falling back: ${String(error)}`);
      return this.getChatSummariesFromSource(chatIds, userId);
    }
  }

  private async shadowReadProjection(
    baseUrl: string,
    chatIds: string[],
    userId: string,
    sourceSummaries: Map<string, ChatMessageSummary>,
  ) {
    if (!this.configService.get<boolean>('shadowReads.chatSummaryProjectionEnabled')) {
      return;
    }

    const params = new URLSearchParams({ chatIds: chatIds.join(','), userId });
    const startedAt = Date.now();

    try {
      const response = await fetch(`${baseUrl}/v1/internal/messages/summaries/projection?${params.toString()}`);
      this.projectionShadowReads += 1;
      this.projectionShadowLastLatencyMs = Date.now() - startedAt;

      if (!response.ok) {
        this.projectionShadowErrors += 1;
        this.logger.warn(`Chat summary projection shadow read failed with status ${response.status}`);
        return;
      }

      const payload = (await response.json()) as ChatSummaryProjectionResponseDto;
      const projectionSummaries = new Map(payload.items.map((summary) => [summary.chatId, summary]));
      this.logSummaryDiffs(chatIds, sourceSummaries, projectionSummaries, 'projection', 'source');
    } catch (error) {
      this.projectionShadowReads += 1;
      this.projectionShadowErrors += 1;
      this.projectionShadowLastLatencyMs = Date.now() - startedAt;
      this.logger.warn(`Chat summary projection shadow read threw: ${String(error)}`);
    }
  }

  private async shadowReadSource(
    baseUrl: string,
    chatIds: string[],
    userId: string,
    projectionSummaries: Map<string, ChatMessageSummary>,
  ) {
    if (!this.configService.get<boolean>('shadowReads.chatSummaryProjectionEnabled')) {
      return;
    }

    const params = new URLSearchParams({ chatIds: chatIds.join(','), userId });
    const startedAt = Date.now();

    try {
      const response = await fetch(`${baseUrl}/v1/internal/messages/summaries?${params.toString()}`);
      this.projectionPrimaryShadowReads += 1;
      this.projectionPrimaryShadowLastLatencyMs = Date.now() - startedAt;

      if (!response.ok) {
        this.projectionPrimaryShadowErrors += 1;
        this.logger.warn(`Chat summary source shadow read failed with status ${response.status}`);
        return;
      }

      const payload = (await response.json()) as { items: ChatMessageSummary[] };
      const sourceSummaries = new Map(payload.items.map((summary) => [summary.chatId, summary]));
      this.logSummaryDiffs(chatIds, sourceSummaries, projectionSummaries, 'source', 'projection', true);
    } catch (error) {
      this.projectionPrimaryShadowReads += 1;
      this.projectionPrimaryShadowErrors += 1;
      this.projectionPrimaryShadowLastLatencyMs = Date.now() - startedAt;
      this.logger.warn(`Chat summary source shadow read threw: ${String(error)}`);
    }
  }

  private logSummaryDiffs(
    chatIds: string[],
    leftSummaries: Map<string, ChatMessageSummary>,
    rightSummaries: Map<string, ChatMessageSummary>,
    leftLabel: string,
    rightLabel: string,
    primary = false,
  ) {
    for (const chatId of chatIds) {
      const left = leftSummaries.get(chatId) ?? null;
      const right = rightSummaries.get(chatId) ?? null;

      if (
        left?.lastMessagePreview !== right?.lastMessagePreview ||
        left?.lastActivityAt !== right?.lastActivityAt ||
        left?.lastSenderUserId !== right?.lastSenderUserId ||
        left?.unreadCount !== right?.unreadCount
      ) {
        if (primary) {
          this.projectionPrimaryShadowMismatches += 1;
        } else {
          this.projectionShadowMismatches += 1;
        }

        this.logger.warn(
          `Chat summary mismatch for chat ${chatId}: ${leftLabel}=${JSON.stringify(left)} ${rightLabel}=${JSON.stringify(right)}`,
        );
      }
    }
  }
}
