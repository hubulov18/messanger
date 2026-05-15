# @telegram/ui

Phase 7 scope: design tokens, four primitives (Text, Pressable, Avatar, Surface), the ChatBubble, the Composer (text + send), and the `useSendMessage` hook with optimistic updates. Phase 8 hardened the optimistic reconciliation and stability of the public hooks.

## Layout

```
src/
  theme/         tokens + ThemeProvider
  primitives/    Text / Pressable / Avatar / Surface
  domain/
    ChatBubble/  message row (internal composition)
    Composer/    input bar with reducer
  hooks/         useCurrentUser / useMessage / useSendMessage
  state/         QueryClient + queryKeys factory
  api/           ApiClient contract + context (host supplies impl)
  utils/         ids, time, haptics
  types.ts       Message / User / Reaction / ReplyRef
```

## Architectural rules

1. **UI ↔ logic separation.** Components consume hooks; hooks own query cache and mutations; components never touch the QueryClient directly.
2. **Tokens, not hex.** Every color goes through a semantic role in `theme/tokens.ts`. Primitives enforce this at the type level.
3. **No inline styles.** Every component uses `StyleSheet.create`. Theme-derived style objects are built in `useMemo`.
4. **Selector subscriptions.** `ChatBubble` reads *its* message via `useMessage(chatId, id)` with a selector — a single delivery-receipt update does not re-render every row.
5. **Optimistic by contract.** `useSendMessage` injects a `status='sending'` bubble immediately, reconciles on success (clientId → serverId), marks `status='failed'` on error so the user can retry. Retries reuse the same clientId — the id list moves to front instead of prepending a duplicate.

## Host-app integration

### Required providers

The host app must mount three providers, in this order:

```tsx
<QueryClientProvider client={queryClient}>
  <ApiClientProvider client={apiClient}>
    <ThemeProvider mode={systemColorScheme}>
      <App />
    </ThemeProvider>
  </ApiClientProvider>
</QueryClientProvider>
```

### ApiClient contract

The host constructs an object matching the `ApiClient` interface and passes it through `ApiClientProvider`. For Phase 7 only one method is required:

```ts
interface ApiClient {
  sendMessage(args: SendMessageArgs): Promise<Message>;
}

interface SendMessageArgs {
  clientId: MessageId;     // server must treat this as idempotency key
  chatId: ChatId;
  body: string;
  replyTo?: ReplyRef;
}
```

The server MUST:

- Accept `clientId` as an idempotency key. A retry with the same clientId must return the same server message, not create a duplicate.
- Return a `Message` whose `id` is the server id. The returned object is written to the cache verbatim (it replaces the optimistic row). If `status`, `createdAt`, or `reactions` are absent from the server response, the host wrapper must fill them before resolving.

Transport-level failures should be thrown as `ApiError` so `onError` can distinguish auth errors from generic failures.

### QueryClient setup

```ts
import { createQueryClient, queryKeys } from '@telegram/ui';

const queryClient = createQueryClient();

// After auth completes, seed the current user cache. useSendMessage and any
// other hook that depends on `useCurrentUser` will start returning defined.
queryClient.setQueryData(queryKeys.currentUser(), currentUser satisfies User);
```

### Cache shape the host must populate

For a chat with id `C`, two keys hold message state:

- `queryKeys.messages(C)` → `MessageMap` (`Record<MessageId, Message>`). Write with `setQueryData` whenever you receive messages from REST, websocket, or local DB.
- `queryKeys.messageIds(C)` → `ReadonlyArray<MessageId>`. **Newest-first** ordering. The `ChatBubble` is id-addressed, so the list is what controls visual order. `FlatList` should render this as `inverted={true}` so the newest bubble sits at the bottom.

`useSendMessage` maintains these two keys during the send lifecycle. The host is responsible for initial load and for websocket-driven updates.

### Websocket reconciliation rules

Websocket messages must coordinate with in-flight sends to avoid duplicate bubbles.

If a pushed message carries the sender's `clientId` (echoed from the original HTTP send), call:

```ts
import { reconcileServerMessage } from '@telegram/ui';

reconcileServerMessage(queryClient, chatId, clientId, serverMessage);
```

This is the same reconciliation `onSuccess` runs — idempotent, safe to call again if the HTTP response arrives later. Use it for:

- Server-pushed echoes of the sender's own message (clientId is known).
- Remote-user messages with clientId set by the server for sync (if your protocol does this).

If a pushed message has no clientId (e.g. a message from another user):

```ts
queryClient.setQueryData<MessageMap>(queryKeys.messages(chatId), (prev) => ({
  ...(prev ?? {}),
  [serverMessage.id]: serverMessage,
}));
queryClient.setQueryData<ReadonlyArray<MessageId>>(queryKeys.messageIds(chatId), (prev) => {
  if (prev === undefined) return [serverMessage.id];
  if (prev.includes(serverMessage.id)) return prev;
  return [serverMessage.id, ...prev];
});
```

These writes are expected — the package only owns its own mutations, not incoming-traffic sync.

### Theme setup

`ThemeProvider` takes a `mode: 'light' | 'dark'`. Wire it to the system color scheme:

```tsx
import { useColorScheme } from 'react-native';
import { ThemeProvider } from '@telegram/ui';

const scheme = useColorScheme();
<ThemeProvider mode={scheme === 'dark' ? 'dark' : 'light'}>{...}</ThemeProvider>
```

User-chosen theme override lives in host settings; forward the resolved mode.

### Required data shapes

```ts
interface User {
  id: UserId;              // matches senderId on messages
  displayName: string;
  avatarUrl?: string;
}

interface TextMessage {
  id: MessageId;           // server id OR client id (c_... prefix) when optimistic
  chatId: ChatId;
  senderId: UserId;
  type: 'text';
  body: string;
  createdAt: number;       // epoch ms
  status: 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
  reactions: Reaction[];   // empty array when no reactions
  editedAt?: number;
  replyTo?: ReplyRef;
}
```

The `ChatBubble` discriminates on `type` — other variants (image, voice, etc.) return `null` today and will be added in M3 when those features land.

## Known trade-offs

- **Animated, not Reanimated.** Press feedback uses RN's `Animated` API. Reanimated will be added in Phase 4 for swipe-to-reply, voice lock, and list gestures.
- **No icon font.** Status glyphs use Unicode (✓, ✓✓, ◯, !).
- **No markdown/link parsing.** `BubbleText` renders plain text. `@telegram/rich-text` lands in M2.
- **Outgoing bubble read ≠ delivered colour.** Both render as ✓✓ in white on the accent ground. A `readIndicator` token will be added when the host wires real receipts.
- **Edit submission bypasses `useSendMessage`.** The Composer passes `onSubmitEdit(messageId, body)` through to the host. Edit mutation is out of Phase 7 scope.
