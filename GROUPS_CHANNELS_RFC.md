# RFC: Groups & Channels — Production-Grade Model
**Status:** Implementation  
**Version:** 1.0  
**Service:** chat-service

---

## Problem

Current model mixes authority (role), participation type, and lifecycle state into a single, undifferentiated membership record. This produces:
- Ad-hoc permission checks scattered across handlers
- No formal state machine for membership lifecycle
- No per-member restriction granularity (ban/mute/restrict are not modelled)
- No audit trail for moderation actions
- Chat-wide permission flags only (no per-admin capability configuration)

---

## Core Design Rules (INVARIANTS — never violate)

1. `role` ∈ `{ owner, admin, member }` — `subscriber` is NEVER a role value
2. `status` ∈ `{ invited, requested, active, banned, left }` — `restricted` is NEVER a status value
3. Restriction is a JSONB overlay on `status='active'` membership — it does not change status
4. Every permission check goes through `getEffectivePermissions(member, chat, chatPermissions)` — no inline role checks in handlers
5. Every moderation action writes to `moderation_log` in the same DB transaction
6. Owner cannot be banned or kicked; ownership transfer is explicit
7. Admin cannot grant permissions they do not possess themselves
8. One active owner per chat: enforced by partial unique index

---

## Three Axes (Separate Concerns)

### Axis 1: Role (Authority)
```
owner  — all permissions, immovable without transfer
admin  — configurable via AdminPermissions flags
member — default participation rights
```

### Axis 2: Participation Type (Derived — never stored)
```typescript
function deriveParticipationType(chatType, role): 'member' | 'subscriber' {
  if (chatType === 'group') return 'member';
  if (role === 'owner' || role === 'admin') return 'member';
  return 'subscriber'; // role=member in a channel → subscriber semantics
}
```

### Axis 3: Lifecycle Status
```
invited   → received invitation, not accepted
requested → sent join request, awaiting approval
active    → participant (may have restriction overlay)
banned    → excluded, cannot rejoin without explicit unban
left      → voluntarily left or kicked; can rejoin if chat allows
```

---

## AdminPermissions (stored as JSONB in chat_members.admin_permissions)

```typescript
interface AdminPermissions {
  canChangeInfo: boolean;       // edit name/description/photo
  canDeleteMessages: boolean;   // delete any message
  canBanUsers: boolean;         // ban/kick/restrict members
  canInviteUsers: boolean;      // create invite links
  canPinMessages: boolean;      // pin/unpin messages
  canManageAdmins: boolean;     // promote/demote admins (bounded by own perms)
  canPostMessages: boolean;     // channel: publish posts
  canEditMessages: boolean;     // channel: edit others' posts
  canManageVoiceChats: boolean; // start/end voice chats
  isAnonymous: boolean;         // show as "Admin" not by name
  customTitle?: string;         // "Editor", "Support", etc.
}

const DEFAULT_ADMIN_PERMISSIONS: AdminPermissions = {
  canChangeInfo: false,
  canDeleteMessages: true,
  canBanUsers: true,
  canInviteUsers: true,
  canPinMessages: true,
  canManageAdmins: false,
  canPostMessages: true,
  canEditMessages: false,
  canManageVoiceChats: false,
  isAnonymous: false,
};
```

## MemberRestrictions (stored as JSONB in chat_members.restriction)

```typescript
interface MemberRestrictions {
  canSendMessages: boolean;
  canSendMedia: boolean;
  canSendStickersAndGifs: boolean;
  canSendPolls: boolean;
  canAddLinkPreviews: boolean;
  canInviteUsers: boolean;
}
// Expiry is stored separately in chat_members.restriction_until (nullable)
// If restriction_until < now() → restriction overlay is ignored (lazy expiry)
```

---

## State Machine

```
[none] ──join open────────────────────────────────► [active]
[none] ──join (approval required)────────────────► [requested]
[none] ──receive invite──────────────────────────► [invited]

[invited]   ──accept──► [active]
[invited]   ──decline─► [none]  (record deleted)

[requested] ──approve─► [active]
[requested] ──decline─► [none]  (record deleted)
[requested] ──cancel──► [none]  (record deleted)

[active]    ──leave───► [left]    (can rejoin)
[active]    ──kick────► [left]    (can rejoin; logged as 'kick' in moderation_log)
[active]    ──ban─────► [banned]  (cannot rejoin without unban)

[left]      ──rejoin──► [active] / [requested]
[left]      ──re-invite► [invited]

[banned]    ──unban───► [none]  (record deleted or status=left)
```

---

## Permission Matrix

| Action | Owner | Admin (full) | Admin (limited) | Member (group) | Subscriber (channel) |
|---|:---:|:---:|:---:|:---:|:---:|
| Read messages | ✓ | ✓ | ✓ | ✓ | ✓ |
| Send message (group) | ✓ | ✓ | ✓ | ✓* | — |
| Post in channel | ✓ | canPost | — | — | ✗ |
| Edit own message | ✓ | ✓ | ✓ | ✓ | ✗ |
| Delete own message | ✓ | ✓ | ✓ | ✓ | ✗ |
| Delete any message | ✓ | canDelete | ✗ | ✗ | ✗ |
| Pin message | ✓ | canPin | ✗ | ✗ | ✗ |
| Edit chat info | ✓ | canChangeInfo | ✗ | ✗ | ✗ |
| View member list | ✓ | ✓ | ✓ | ✓ | ✗ |
| Invite users | ✓ | canInvite | canInvite | if allowed | ✗ |
| Create invite link | ✓ | canInvite | ✗ | ✗ | ✗ |
| Approve join requests | ✓ | canBan | ✗ | ✗ | ✗ |
| Restrict member | ✓ | canBan | ✗ | ✗ | ✗ |
| Kick member | ✓ | canBan | ✗ | ✗ | ✗ |
| Ban member | ✓ | canBan | ✗ | ✗ | ✗ |
| Promote to admin | ✓ | canManageAdmins | ✗ | ✗ | ✗ |
| Demote admin | ✓ | own promotees | ✗ | ✗ | ✗ |
| Transfer ownership | ✓ | ✗ | ✗ | ✗ | ✗ |

*subject to chat-wide canSendMessages flag and per-member restriction overlay

---

## Schema Changes (Phase 1)

### New enums
- `JoinMode`: `open | approval_required | invite_only`
- `HistoryVisibility`: `visible_to_all | visible_from_join`
- `JoinRequestStatus`: `pending | approved | declined`
- Add `requested` to existing `ChatMemberStatus`

### chats table — new columns
- `join_mode JoinMode DEFAULT 'open'`
- `is_public BOOLEAN DEFAULT false`
- `history_visibility HistoryVisibility DEFAULT 'visible_to_all'`
- `allow_member_invites BOOLEAN DEFAULT true`

### chat_members table — new columns
- `admin_permissions JSONB` (nullable, only set when role=admin)
- `restriction JSONB` (nullable, overlay — NOT a status)
- `restriction_until TIMESTAMPTZ` (nullable, for lazy expiry)
- `restricted_by_user_id TEXT` (nullable)
- `restricted_at TIMESTAMPTZ` (nullable)
- `banned_by_user_id TEXT` (nullable)
- `banned_at TIMESTAMPTZ` (nullable)
- `banned_reason TEXT` (nullable)
- `promoted_by_user_id TEXT` (nullable)
- `promoted_at TIMESTAMPTZ` (nullable)

### invite_links table — new columns
- `requires_approval BOOLEAN DEFAULT false`
- `is_primary BOOLEAN DEFAULT false`

### New tables
- `join_requests` (id, chat_id, user_id, invite_link_id, status, reviewed_by_user_id, reviewed_at, created_at)
- `moderation_log` (id, chat_id, performed_by_user_id, target_user_id, target_message_id, action, meta JSONB, created_at)

### New indexes
- `UNIQUE ON chat_members(chat_id) WHERE role='owner' AND status='active'` — one owner invariant
- `UNIQUE ON join_requests(chat_id, user_id) WHERE status='pending'` — one pending request
- `INDEX ON chat_members(restriction_until) WHERE restriction_until IS NOT NULL`
- `INDEX ON moderation_log(chat_id, created_at DESC)`

---

## New API Endpoints

```
POST   /chats/:chatId/members/:userId/ban
DELETE /chats/:chatId/members/:userId/ban           (unban)
POST   /chats/:chatId/members/:userId/kick
POST   /chats/:chatId/members/:userId/restrict
DELETE /chats/:chatId/members/:userId/restrict      (unrestrict)
POST   /chats/:chatId/members/:userId/promote
POST   /chats/:chatId/members/:userId/demote
GET    /chats/:chatId/members/:userId/permissions
GET    /chats/:chatId/join-requests
POST   /chats/:chatId/join-requests/:requestId/approve
POST   /chats/:chatId/join-requests/:requestId/decline
GET    /chats/:chatId/moderation-log
POST   /chats/:chatId/join                          (direct join / request)
```

---

## Migration Phases

### Phase 1 — Schema (zero breaking changes)
All new columns are nullable or have safe defaults. Existing data valid as-is.

### Phase 2 — Permission Engine
Replace ad-hoc checks with `getEffectivePermissions`. All new endpoints use it from day one.

### Phase 3 — UX Endpoints
Join requests flow, moderation log screen, effective permissions endpoint.

---

## Open Questions
1. Linked discussion group for channels — phase 2+, not in scope here
2. Custom admin titles visible in UI — included in AdminPermissions.customTitle
3. Transfer ownership — requires separate confirm flow on mobile
4. Anti-spam / flood control — separate concern, not in this RFC
