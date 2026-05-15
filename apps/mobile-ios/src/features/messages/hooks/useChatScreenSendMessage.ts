/**
 * DEPRECATED — Phase 9 migration.
 *
 * Send logic (optimistic insert, retry, failure marking) is now handled
 * internally by the real @telegram/ui Composer and useSendMessage hook.
 * ChatScreen uses useSendMessage().retry for failed-message retry only.
 *
 * This file is no longer referenced by any module and should be deleted
 * from the repository.
 */
