import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import type { Request, Response } from 'express';

type GatewayErrorBody = {
  error: {
    code: string;
    message: string;
    details: unknown;
    requestId: string;
  };
};

@Catch()
export class GatewayExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost): void {
    const context = host.switchToHttp();
    const request = context.getRequest<Request>();
    const response = context.getResponse<Response>();
    const requestId = this.getRequestId(request);

    const normalized = this.normalizeException(exception, requestId);

    response.status(normalized.status);
    response.setHeader('content-type', 'application/json; charset=utf-8');
    response.setHeader('x-request-id', requestId);
    response.send(JSON.stringify(normalized.body));
  }

  private normalizeException(
    exception: unknown,
    requestId: string,
  ): { status: number; body: GatewayErrorBody } {
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const body = exception.getResponse();
      const parsed = this.extractHttpExceptionBody(body);

      return {
        status,
        body: {
          error: {
            code: this.mapStatusToCode(status),
            message: parsed.message,
            details: parsed.details,
            requestId,
          },
        },
      };
    }

    return {
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      body: {
        error: {
          code: 'INTERNAL_ERROR',
          message: 'The gateway failed to process the request.',
          details: null,
          requestId,
        },
      },
    };
  }

  private extractHttpExceptionBody(body: string | object): { message: string; details: unknown } {
    if (typeof body === 'string') {
      return {
        message: body,
        details: null,
      };
    }

    if ('message' in body) {
      const message = body.message;
      return {
        message: Array.isArray(message) ? 'The request payload is invalid.' : String(message),
        details: message,
      };
    }

    return {
      message: 'Request failed.',
      details: body,
    };
  }

  private mapStatusToCode(status: number): string {
    switch (status) {
      case HttpStatus.BAD_REQUEST:
        return 'VALIDATION_ERROR';
      case HttpStatus.UNAUTHORIZED:
        return 'UNAUTHENTICATED';
      case HttpStatus.FORBIDDEN:
        return 'FORBIDDEN';
      case HttpStatus.NOT_FOUND:
        return 'NOT_FOUND';
      case HttpStatus.CONFLICT:
        return 'CONFLICT';
      case HttpStatus.TOO_MANY_REQUESTS:
        return 'RATE_LIMITED';
      default:
        return status >= 500 ? 'INTERNAL_ERROR' : 'UNKNOWN_ERROR';
    }
  }

  private getRequestId(request: Request): string {
    const headerValue = request.headers['x-request-id'];
    const requestId = Array.isArray(headerValue) ? headerValue[0] : headerValue;
    return requestId?.trim() || 'req_' + randomUUID();
  }
}
