import { ServiceUnavailableException } from '@nestjs/common';

const DEFAULT_DOWNSTREAM_TIMEOUT_MS = 5000;

export async function fetchWithDownstreamTimeout(
  url: string,
  init: RequestInit,
  unavailableMessage: string,
  timeoutMs = DEFAULT_DOWNSTREAM_TIMEOUT_MS,
) {
  try {
    return await fetch(url, {
      ...init,
      signal: AbortSignal.timeout(timeoutMs),
    });
  } catch (error) {
    const isTimeout = error instanceof Error && (error.name === 'TimeoutError' || error.name === 'AbortError');
    throw new ServiceUnavailableException(isTimeout ? `${unavailableMessage} (timed out)` : unavailableMessage);
  }
}
