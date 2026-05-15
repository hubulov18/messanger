/**
 * Client-generated message id. Prefixed so the reconciliation step in
 * useSendMessage can distinguish optimistic rows from server rows at a glance.
 *
 * Collision probability for the random suffix is effectively zero at human
 * message rates; no crypto-strength guarantee is needed for idempotency keys
 * since the server is the authority.
 */
export function clientMessageId(): string {
  const now = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 10);
  return `c_${now}_${rand}`;
}

/** Type guard for optimistic/client-originated ids. */
export function isClientId(id: string): boolean {
  return id.startsWith('c_');
}
