import { useSessionStore } from '@shared/auth/session.store';
import { env } from '@shared/config/env';
import {
  clearSession as clearStoredSession,
  loadSession,
  saveRefreshSession,
} from '@shared/storage/secure-session-storage';

import type { ApiErrorResponse } from './types';

type RequestOptions = {
  method: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  path: string;
  body?: unknown;
  authenticated?: boolean;
  timeoutMs?: number;
  skipSessionRefresh?: boolean;
};

const DEFAULT_REQUEST_TIMEOUT_MS = 30_000;
const RETRY_DELAY_MS = 350;
const inFlightGetRequests = new Map<string, Promise<unknown>>();
let inFlightSessionRefresh: Promise<string | null> | null = null;

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function isTransientNetworkFailure(error: unknown) {
  if (!error || typeof error !== 'object') {
    return false;
  }

  if ('code' in error && error.code === 'REQUEST_TIMEOUT') {
    return true;
  }

  if ('message' in error && typeof error.message === 'string') {
    const normalized = error.message.toLowerCase();
    return normalized.includes('network request failed') || normalized.includes('timed out') || normalized.includes('network');
  }

  return false;
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      throw { code: 'REQUEST_TIMEOUT', message: 'Request timed out' };
    }

    throw error;
  } finally {
    clearTimeout(timeoutId);
  }
}

async function performSessionRefresh(timeoutMs: number): Promise<string | null> {
  if (inFlightSessionRefresh) {
    return inFlightSessionRefresh;
  }

  inFlightSessionRefresh = (async () => {
    const sessionStore = useSessionStore.getState();
    const storedSession = await loadSession();
    const refreshToken = sessionStore.refreshToken ?? storedSession?.refreshToken ?? null;
    const deviceId = sessionStore.deviceId ?? storedSession?.deviceId ?? null;

    if (!refreshToken || !deviceId) {
      await clearStoredSession();
      useSessionStore.getState().clearSession(deviceId);
      return null;
    }

    const response = await fetchWithTimeout(
      `${env.apiBaseUrl}/auth/refresh`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          refreshToken,
          deviceId,
        }),
      },
      timeoutMs,
    );

    const text = await response.text();
    const payload = text ? JSON.parse(text) : null;

    if (!response.ok) {
      await clearStoredSession();
      useSessionStore.getState().clearSession(deviceId);
      return null;
    }

    if (
      !payload ||
      typeof payload !== 'object' ||
      typeof payload.accessToken !== 'string' ||
      payload.accessToken.length === 0 ||
      typeof payload.refreshToken !== 'string' ||
      payload.refreshToken.length === 0
    ) {
      await clearStoredSession();
      useSessionStore.getState().clearSession(deviceId);
      return null;
    }

    await saveRefreshSession({
      deviceId,
      refreshToken: payload.refreshToken,
    });

    useSessionStore.setState({
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      deviceId,
    });

    return payload.accessToken;
  })();

  try {
    return await inFlightSessionRefresh;
  } finally {
    inFlightSessionRefresh = null;
  }
}

function isUnauthenticatedErrorResponse(response: Response, payload: ApiErrorResponse | null) {
  if (response.status !== 401) {
    return false;
  }

  const errorCode = payload?.error?.code;
  return errorCode === 'UNAUTHENTICATED' || errorCode === undefined;
}

async function executeRequest<T>(options: RequestOptions, timeoutMs: number, accessTokenOverride?: string | null) {
  const accessToken = accessTokenOverride ?? useSessionStore.getState().accessToken;
  const deviceId = useSessionStore.getState().deviceId;

  const headers: Record<string, string> = {
    'content-type': 'application/json',
  };

  if (options.authenticated && accessToken) {
    headers.authorization = `Bearer ${accessToken}`;
  }

  if (options.authenticated && deviceId) {
    headers['x-device-id'] = deviceId;
  }

  const url = `${env.apiBaseUrl}${options.path}`;
  const requestInit: RequestInit = {
    method: options.method,
    headers,
    ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
  };

  let response: Response;

  try {
    response = await fetchWithTimeout(url, requestInit, timeoutMs);
  } catch (error) {
    if (options.method === 'GET' && isTransientNetworkFailure(error)) {
      await sleep(RETRY_DELAY_MS);
      response = await fetchWithTimeout(url, requestInit, timeoutMs);
    } else {
      throw error;
    }
  }

  const text = await response.text();
  const payload = text ? JSON.parse(text) : null;

  return {
    response,
    payload: payload as T | ApiErrorResponse | null,
  };
}

function buildRequestKey(url: string, options: RequestOptions, accessToken: string | null, deviceId: string | null) {
  return JSON.stringify({
    method: options.method,
    url,
    body: options.body ?? null,
    authenticated: Boolean(options.authenticated),
    accessToken: accessToken ?? null,
    deviceId: deviceId ?? null,
  });
}

export async function apiRequest<T>(options: RequestOptions): Promise<T> {
  const accessToken = useSessionStore.getState().accessToken;
  const deviceId = useSessionStore.getState().deviceId;

  const timeoutMs = options.timeoutMs ?? DEFAULT_REQUEST_TIMEOUT_MS;
  const url = `${env.apiBaseUrl}${options.path}`;

  const requestKey = options.method === 'GET'
    ? buildRequestKey(url, options, accessToken ?? null, deviceId ?? null)
    : null;

  if (requestKey) {
    const existingRequest = inFlightGetRequests.get(requestKey);
    if (existingRequest) {
      return existingRequest as Promise<T>;
    }
  }

  const requestPromise = (async () => {
    const attempt = await executeRequest<T>(options, timeoutMs);

    if (attempt.response.ok) {
      return attempt.payload as T;
    }

    const firstError = attempt.payload as ApiErrorResponse | null;
    const shouldRefresh =
      options.authenticated &&
      !options.skipSessionRefresh &&
      isUnauthenticatedErrorResponse(attempt.response, firstError);

    if (shouldRefresh) {
      const refreshedAccessToken = await performSessionRefresh(timeoutMs);

      if (refreshedAccessToken) {
        const retryAttempt = await executeRequest<T>(options, timeoutMs, refreshedAccessToken);

        if (retryAttempt.response.ok) {
          return retryAttempt.payload as T;
        }

        const retryError = retryAttempt.payload as ApiErrorResponse | null;
        throw retryError?.error ?? { code: 'UNKNOWN_ERROR', message: 'Request failed' };
      }
    }

    throw firstError?.error ?? { code: 'UNKNOWN_ERROR', message: 'Request failed' };
  })();

  if (!requestKey) {
    return requestPromise;
  }

  inFlightGetRequests.set(requestKey, requestPromise);

  try {
    return await requestPromise;
  } finally {
    inFlightGetRequests.delete(requestKey);
  }
}
