import { createContext, useContext, type PropsWithChildren } from 'react';
import type { ApiClient } from './client';

/**
 * Context that exposes the host-provided ApiClient to hooks.
 * Kept minimal; the host is expected to construct a single client instance
 * and pass it at the app root.
 */

const ApiClientContext = createContext<ApiClient | null>(null);

export interface ApiClientProviderProps {
  readonly client: ApiClient;
}

export function ApiClientProvider({ client, children }: PropsWithChildren<ApiClientProviderProps>) {
  return <ApiClientContext.Provider value={client}>{children}</ApiClientContext.Provider>;
}

export function useApiClient(): ApiClient {
  const client = useContext(ApiClientContext);
  if (client === null) {
    throw new Error('useApiClient must be used inside <ApiClientProvider>.');
  }
  return client;
}
