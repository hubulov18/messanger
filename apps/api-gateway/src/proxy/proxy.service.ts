import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export type ProxyTarget = 'identity' | 'profile' | 'chat' | 'message' | 'contacts' | 'media' | 'notification' | 'call';

type ProxyRequest = {
  target: ProxyTarget;
  path: string;
  method: string;
  requestId: string;
  headers: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type ProxyResponse = {
  status: number;
  headers: {
    contentType: string;
    requestId: string;
  };
  body: string;
};

type GatewayErrorBody = {
  error: {
    code: string;
    message: string;
    details: unknown;
    requestId: string;
  };
};

@Injectable()
export class ProxyService {
  constructor(private readonly configService: ConfigService) {}

  async forward(request: ProxyRequest): Promise<ProxyResponse> {
    const serviceUrl = this.getServiceUrl(request.target);
    const url = new URL(request.path, `${serviceUrl}/`);

    for (const [key, value] of Object.entries(request.query ?? {})) {
      if (value === undefined) {
        continue;
      }

      if (Array.isArray(value)) {
        for (const item of value) {
          url.searchParams.append(key, item);
        }
        continue;
      }

      url.searchParams.set(key, value);
    }

    const timeoutMs = this.configService.get<number>('services.upstreamTimeoutMs') ?? 10_000;
    const headers = this.buildHeaders(request.headers, request.requestId, request.body !== undefined);

    try {
      const response = await fetch(url, {
        method: request.method,
        headers,
        signal: AbortSignal.timeout(timeoutMs),
        ...(request.body !== undefined ? { body: JSON.stringify(request.body) } : {}),
      });

      const text = await response.text();
      if (response.ok) {
        return {
          status: response.status,
          headers: {
            contentType: response.headers.get('content-type') ?? 'application/json; charset=utf-8',
            requestId: request.requestId,
          },
          body: text,
        };
      }

      return this.buildNormalizedUpstreamErrorResponse(request, response.status, text);
    } catch (error) {
      return this.buildGatewayErrorResponse(request, error);
    }
  }

  private buildNormalizedUpstreamErrorResponse(
    request: ProxyRequest,
    status: number,
    bodyText: string,
  ): ProxyResponse {
    const parsed = this.tryParseJson(bodyText);
    const normalizedError = this.normalizeUpstreamError(status, parsed, request.requestId);

    return {
      status,
      headers: {
        contentType: 'application/json; charset=utf-8',
        requestId: request.requestId,
      },
      body: JSON.stringify(normalizedError),
    };
  }

  private normalizeUpstreamError(status: number, parsedBody: unknown, requestId: string): GatewayErrorBody {
    if (this.isGatewayErrorBody(parsedBody)) {
      return {
        error: {
          code: parsedBody.error.code,
          message: parsedBody.error.message,
          details: parsedBody.error.details ?? null,
          requestId,
        },
      };
    }

    if (this.isNestErrorBody(parsedBody)) {
      return {
        error: {
          code: this.mapStatusToCode(status),
          message: parsedBody.message,
          details: parsedBody.details,
          requestId,
        },
      };
    }

    return {
      error: {
        code: this.mapStatusToCode(status),
        message: this.defaultMessageForStatus(status),
        details: parsedBody ?? null,
        requestId,
      },
    };
  }

  private buildGatewayErrorResponse(request: ProxyRequest, error: unknown): ProxyResponse {
    const isTimeout = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    const status = isTimeout ? 504 : 502;
    const code = isTimeout ? 'UPSTREAM_TIMEOUT' : 'BAD_GATEWAY';
    const message = isTimeout
      ? 'The upstream service did not respond in time.'
      : 'The upstream service is unavailable.';

    return {
      status,
      headers: {
        contentType: 'application/json; charset=utf-8',
        requestId: request.requestId,
      },
      body: JSON.stringify({
        error: {
          code,
          message,
          details: {
            target: request.target,
            path: request.path,
          },
          requestId: request.requestId,
        },
      }),
    };
  }

  private mapStatusToCode(status: number): string {
    switch (status) {
      case 400:
        return 'VALIDATION_ERROR';
      case 401:
        return 'UNAUTHENTICATED';
      case 403:
        return 'FORBIDDEN';
      case 404:
        return 'NOT_FOUND';
      case 409:
        return 'CONFLICT';
      case 429:
        return 'RATE_LIMITED';
      default:
        return status >= 500 ? 'BAD_GATEWAY' : 'UNKNOWN_ERROR';
    }
  }

  private defaultMessageForStatus(status: number): string {
    switch (status) {
      case 400:
        return 'The request payload is invalid.';
      case 401:
        return 'Authentication is required.';
      case 403:
        return 'You do not have permission to perform this action.';
      case 404:
        return 'The requested resource was not found.';
      case 409:
        return 'The request conflicts with current state.';
      case 429:
        return 'Too many requests.';
      default:
        return status >= 500 ? 'The upstream service failed to process the request.' : 'Request failed.';
    }
  }

  private isGatewayErrorBody(value: unknown): value is GatewayErrorBody {
    if (!value || typeof value !== 'object' || !('error' in value)) {
      return false;
    }

    const error = (value as { error: unknown }).error;
    return (
      !!error &&
      typeof error === 'object' &&
      'code' in error &&
      'message' in error &&
      typeof (error as { code: unknown }).code === 'string' &&
      typeof (error as { message: unknown }).message === 'string'
    );
  }

  private isNestErrorBody(value: unknown): value is { message: string; details: unknown } {
    if (!value || typeof value !== 'object' || !('message' in value)) {
      return false;
    }

    const message = (value as { message: unknown }).message;
    if (typeof message === 'string') {
      return true;
    }

    if (Array.isArray(message)) {
      return true;
    }

    return false;
  }

  private tryParseJson(bodyText: string): unknown {
    if (!bodyText.trim()) {
      return null;
    }

    try {
      return JSON.parse(bodyText) as unknown;
    } catch {
      return bodyText;
    }
  }

  private getServiceUrl(target: ProxyTarget): string {
    switch (target) {
      case 'identity':
        return this.configService.get<string>('services.identityServiceUrl') ?? 'http://localhost:3001';
      case 'profile':
        return this.configService.get<string>('services.profileServiceUrl') ?? 'http://localhost:3004';
      case 'chat':
        return this.configService.get<string>('services.chatServiceUrl') ?? 'http://localhost:3002';
      case 'message':
        return this.configService.get<string>('services.messageServiceUrl') ?? 'http://localhost:3003';
      case 'contacts':
        return this.configService.get<string>('services.contactsServiceUrl') ?? 'http://localhost:3005';
      case 'media':
        return this.configService.get<string>('services.mediaServiceUrl') ?? 'http://localhost:3006';
      case 'notification':
        return this.configService.get<string>('services.notificationServiceUrl') ?? 'http://localhost:3008';
      case 'call':
        return this.configService.get<string>('services.callServiceUrl') ?? 'http://localhost:3007';
    }
  }

  private buildHeaders(
    sourceHeaders: Record<string, string | string[] | undefined>,
    requestId: string,
    includeJsonContentType: boolean,
  ): Record<string, string> {
    const allowedHeaders = [
      'authorization',
      'x-device-id',
      'x-client-version',
      'x-platform',
      'user-agent',
    ];

    const headers: Record<string, string> = {
      'x-request-id': requestId,
    };

    for (const headerName of allowedHeaders) {
      const value = sourceHeaders[headerName];
      if (!value) {
        continue;
      }

      headers[headerName] = Array.isArray(value) ? value.join(',') : value;
    }

    if (includeJsonContentType) {
      headers['content-type'] = 'application/json';
    }

    return headers;
  }
}
