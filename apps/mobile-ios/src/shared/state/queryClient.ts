import { createQueryClient } from '@telegram/ui';

/**
 * The app's single QueryClient instance.
 *
 * Constructed at module top level so non-React consumers (socket worker,
 * auth bootstrap, push-notification handlers) can `setQueryData` without
 * threading context through React. The QueryClientProvider in AppProviders
 * hands this same instance to the component tree.
 *
 * `createQueryClient` comes from @telegram/ui — it pre-configures retry
 * behavior so auth errors (401/403) are not retried.
 */
export const queryClient = createQueryClient();
