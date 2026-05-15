/**
 * Chat Permission Engine
 *
 * Single source of truth for all permission decisions.
 * ❌ No handler, guard, or service should perform inline role checks.
 * ✅ All permission decisions flow through getEffectivePermissions().
 *
 * Design rules:
 *  - role ∈ { owner, admin, member }  — 'subscriber' is NEVER a role value
 *  - status ∈ { invited, requested, active, banned, left, removed }
 *    'restricted' is NEVER a status — restriction is a JSONB overlay
 *  - Restriction can only REDUCE permissions, never expand them (AND semantics)
 *  - Expired restrictions (until < now) are silently ignored (lazy expiry)
 */

// ── Domain types ──────────────────────────────────────────────────────────────

export type ChatMemberRole = 'owner' | 'admin' | 'member';
export type ChatMemberStatus = 'active' | 'invited' | 'requested' | 'banned' | 'left' | 'removed';
export type ChatType = 'group' | 'channel' | 'direct';

/**
 * Participation type — derived, never stored.
 * 'subscriber' is NOT a role; it describes the participation semantics
 * for role='member' users in a channel.
 */
export type ParticipationType = 'member' | 'subscriber';

export interface AdminPermissions {
  canChangeInfo: boolean;
  canDeleteMessages: boolean;
  canBanUsers: boolean;
  canInviteUsers: boolean;
  canPinMessages: boolean;
  canManageAdmins: boolean;
  canPostMessages: boolean;     // channel: publish posts
  canEditMessages: boolean;     // channel: edit others' posts
  canManageVoiceChats: boolean;
  isAnonymous: boolean;
  customTitle?: string;
}

/**
 * Restriction overlay — applied on top of status='active'.
 * Expiry is stored separately (restrictionUntil) and checked in the engine.
 * ❌ This is NOT a lifecycle status.
 */
export interface MemberRestrictions {
  canSendMessages: boolean;
  canSendMedia: boolean;
  canSendStickersAndGifs: boolean;
  canSendPolls: boolean;
  canAddLinkPreviews: boolean;
  canInviteUsers: boolean;
}

/** Subset of ChatMember fields the engine needs. */
export interface MemberInput {
  role: ChatMemberRole;
  status: ChatMemberStatus;
  adminPermissions?: AdminPermissions | null;
  restriction?: MemberRestrictions | null;
  restrictionUntil?: Date | null;
}

/** Subset of Chat fields the engine needs. */
export interface ChatInput {
  type: ChatType;
  allowMemberInvites: boolean;
}

/**
 * Chat-wide default permissions (from existing chat_permissions table).
 * These apply to all members as a baseline; per-member restrictions overlay on top.
 */
export interface ChatPermissionsInput {
  canSendMessages: boolean;
  canAddMembers: boolean;
  canPinMessages: boolean;
}

export interface EffectivePermissions {
  // Content access
  canRead: boolean;

  // Sending (subject to restriction overlay)
  canSendMessages: boolean;
  canSendMedia: boolean;
  canSendStickersAndGifs: boolean;
  canSendPolls: boolean;
  canAddLinkPreviews: boolean;

  // Own content management
  canEditOwnMessages: boolean;
  canDeleteOwnMessages: boolean;

  // Admin content actions
  canDeleteAnyMessage: boolean;
  canEditAnyChannelPost: boolean;
  canPinMessages: boolean;

  // Membership management
  canInviteUsers: boolean;
  canCreateInviteLink: boolean;
  canApproveJoinRequests: boolean;
  canViewMemberList: boolean;
  canViewSubscriberList: boolean;

  // Moderation
  canRestrictMembers: boolean;
  canKickMembers: boolean;
  canBanMembers: boolean;
  canUnbanMembers: boolean;

  // Administration
  canEditChatInfo: boolean;
  canManageAdmins: boolean;
  canManageVoiceChats: boolean;

  // Owner only
  canTransferOwnership: boolean;

  // Computed denial reasons for UI display
  denialReasons: Partial<Record<keyof Omit<EffectivePermissions, 'denialReasons'>, string>>;
}

// ── Defaults ──────────────────────────────────────────────────────────────────

export const DEFAULT_ADMIN_PERMISSIONS: Readonly<AdminPermissions> = {
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

export const MUTED_RESTRICTIONS: Readonly<MemberRestrictions> = {
  canSendMessages: false,
  canSendMedia: false,
  canSendStickersAndGifs: false,
  canSendPolls: false,
  canAddLinkPreviews: false,
  canInviteUsers: true,
};

export const NO_RESTRICTIONS: Readonly<MemberRestrictions> = {
  canSendMessages: true,
  canSendMedia: true,
  canSendStickersAndGifs: true,
  canSendPolls: true,
  canAddLinkPreviews: true,
  canInviteUsers: true,
};

// ── Derived participation type ────────────────────────────────────────────────

/**
 * Derives participation type from chat type + role.
 * 'subscriber' is NOT stored anywhere — it is always computed.
 *
 * group  + any role  → 'member'   (bidirectional conversation)
 * channel + owner    → 'member'   (full publisher)
 * channel + admin    → 'member'   (publisher if canPostMessages)
 * channel + member   → 'subscriber' (read-only by default)
 */
export function deriveParticipationType(
  chatType: ChatType,
  role: ChatMemberRole,
): ParticipationType {
  if (chatType === 'group' || chatType === 'direct') return 'member';
  if (role === 'owner' || role === 'admin') return 'member';
  return 'subscriber';
}

// ── Core engine ───────────────────────────────────────────────────────────────

/**
 * THE single permission evaluation function.
 * All handlers must use this. No inline role checks elsewhere.
 *
 * Evaluation order:
 *  1. Non-active statuses → deny all
 *  2. Base permissions from role (owner > admin > member/subscriber)
 *  3. Chat-wide defaults reduce member permissions (canSendMessages, canPinMessages)
 *  4. Per-member restriction overlay further reduces permissions (AND semantics)
 *  5. Return EffectivePermissions with denialReasons for UI
 */
export function getEffectivePermissions(
  member: MemberInput,
  chat: ChatInput,
  chatPermissions?: ChatPermissionsInput | null,
): EffectivePermissions {
  // ── Step 1: Non-active statuses → everything denied ───────────────────────
  const inactiveStatus = resolveInactiveStatus(member.status);
  if (inactiveStatus) {
    return buildDenied(inactiveStatus);
  }

  // status === 'active' from this point

  // ── Step 2: Base permissions from role ────────────────────────────────────
  let perms: EffectivePermissions;

  if (member.role === 'owner') {
    perms = buildOwnerPermissions();
  } else if (member.role === 'admin') {
    const ap = member.adminPermissions ?? DEFAULT_ADMIN_PERMISSIONS;
    perms = buildAdminPermissions(ap, chat);
  } else {
    const pt = deriveParticipationType(chat.type, member.role);
    perms = buildMemberPermissions(pt, chat, chatPermissions ?? null);
  }

  // ── Step 3: Per-member restriction overlay (AND semantics only) ───────────
  if (member.restriction && !isRestrictionExpired(member.restrictionUntil)) {
    perms = applyRestrictionOverlay(perms, member.restriction, member.restrictionUntil);
  }

  return perms;
}

// ── Guard helpers (use in service layer) ─────────────────────────────────────

/**
 * Checks whether actor can moderate (ban/kick/restrict) a target member.
 * Called after getEffectivePermissions confirms canBanMembers on actor.
 */
export function canActorModerateTarget(
  actorRole: ChatMemberRole,
  targetRole: ChatMemberRole,
): boolean {
  if (targetRole === 'owner') return false;                          // owner is inviolable
  if (targetRole === 'admin' && actorRole !== 'owner') return false; // only owner can touch admins
  return true;
}

/**
 * Checks whether actor can configure admin permissions for target.
 * Actor must have canManageAdmins AND must have promoted the target
 * (unless actor is owner, who can configure anyone).
 */
export function canActorConfigureAdmin(
  actorRole: ChatMemberRole,
  actorHasManageAdmins: boolean,
  targetPromotedByUserId: string | null | undefined,
  actorUserId: string,
): boolean {
  if (actorRole === 'owner') return true;
  if (!actorHasManageAdmins) return false;
  return targetPromotedByUserId === actorUserId;
}

/**
 * Ensures actor does not grant permissions they don't possess.
 * Returns a sanitised AdminPermissions where each flag is actor's value AND requested value.
 */
export function sanitiseGrantedAdminPermissions(
  actorPermissions: AdminPermissions,
  requested: Partial<AdminPermissions>,
): AdminPermissions {
  const base = { ...DEFAULT_ADMIN_PERMISSIONS, ...requested };
  return {
    canChangeInfo:       base.canChangeInfo       && actorPermissions.canChangeInfo,
    canDeleteMessages:   base.canDeleteMessages   && actorPermissions.canDeleteMessages,
    canBanUsers:         base.canBanUsers         && actorPermissions.canBanUsers,
    canInviteUsers:      base.canInviteUsers      && actorPermissions.canInviteUsers,
    canPinMessages:      base.canPinMessages      && actorPermissions.canPinMessages,
    canManageAdmins:     base.canManageAdmins     && actorPermissions.canManageAdmins,
    canPostMessages:     base.canPostMessages     && actorPermissions.canPostMessages,
    canEditMessages:     base.canEditMessages     && actorPermissions.canEditMessages,
    canManageVoiceChats: base.canManageVoiceChats && actorPermissions.canManageVoiceChats,
    isAnonymous:         base.isAnonymous ?? false,
    ...(base.customTitle !== undefined ? { customTitle: base.customTitle } : {}),
  };
}

// ── Private builders ──────────────────────────────────────────────────────────

function resolveInactiveStatus(status: ChatMemberStatus): string | null {
  switch (status) {
    case 'banned':    return 'You are banned from this chat';
    case 'left':      return 'You are not a member of this chat';
    case 'removed':   return 'You are not a member of this chat';
    case 'invited':   return 'You have a pending invitation to this chat';
    case 'requested': return 'Your join request is pending approval';
    case 'active':    return null;
    default:          return 'Access denied';
  }
}

function buildOwnerPermissions(): EffectivePermissions {
  return {
    canRead: true,
    canSendMessages: true,
    canSendMedia: true,
    canSendStickersAndGifs: true,
    canSendPolls: true,
    canAddLinkPreviews: true,
    canEditOwnMessages: true,
    canDeleteOwnMessages: true,
    canDeleteAnyMessage: true,
    canEditAnyChannelPost: true,
    canPinMessages: true,
    canInviteUsers: true,
    canCreateInviteLink: true,
    canApproveJoinRequests: true,
    canViewMemberList: true,
    canViewSubscriberList: true,
    canRestrictMembers: true,
    canKickMembers: true,
    canBanMembers: true,
    canUnbanMembers: true,
    canEditChatInfo: true,
    canManageAdmins: true,
    canManageVoiceChats: true,
    canTransferOwnership: true,
    denialReasons: {},
  };
}

function buildAdminPermissions(ap: AdminPermissions, chat: ChatInput): EffectivePermissions {
  const isChannel = chat.type === 'channel';
  return {
    canRead: true,
    canSendMessages:      isChannel ? ap.canPostMessages : true,
    canSendMedia:         isChannel ? ap.canPostMessages : true,
    canSendStickersAndGifs: !isChannel,
    canSendPolls:         !isChannel,
    canAddLinkPreviews:   true,
    canEditOwnMessages:   true,
    canDeleteOwnMessages: true,
    canDeleteAnyMessage:  ap.canDeleteMessages,
    canEditAnyChannelPost: ap.canEditMessages,
    canPinMessages:       ap.canPinMessages,
    canInviteUsers:       ap.canInviteUsers,
    canCreateInviteLink:  ap.canInviteUsers,
    canApproveJoinRequests: ap.canBanUsers,
    canViewMemberList:    true,
    canViewSubscriberList: true,
    canRestrictMembers:   ap.canBanUsers,
    canKickMembers:       ap.canBanUsers,
    canBanMembers:        ap.canBanUsers,
    canUnbanMembers:      ap.canBanUsers,
    canEditChatInfo:      ap.canChangeInfo,
    canManageAdmins:      ap.canManageAdmins,
    canManageVoiceChats:  ap.canManageVoiceChats,
    canTransferOwnership: false,
    denialReasons: {},
  };
}

function buildMemberPermissions(
  participationType: ParticipationType,
  chat: ChatInput,
  chatPerms: ChatPermissionsInput | null,
): EffectivePermissions {
  const isSubscriber = participationType === 'subscriber';
  // Chat-wide default: canSendMessages from chat_permissions table
  const chatAllowsSend = chatPerms ? chatPerms.canSendMessages : true;
  const chatAllowsPin  = chatPerms ? chatPerms.canPinMessages : false;

  const canSend = !isSubscriber && chatAllowsSend;

  const reasons: EffectivePermissions['denialReasons'] = {};
  if (isSubscriber) {
    reasons.canSendMessages = 'Only admins can post in this channel';
    reasons.canSendMedia = 'Only admins can post in this channel';
  } else if (!chatAllowsSend) {
    reasons.canSendMessages = 'Sending messages is disabled in this chat';
    reasons.canSendMedia = 'Sending media is disabled in this chat';
  }

  return {
    canRead: true,
    canSendMessages:       canSend,
    canSendMedia:          canSend,
    canSendStickersAndGifs: canSend,
    canSendPolls:          canSend,
    canAddLinkPreviews:    canSend,
    canEditOwnMessages:    !isSubscriber,
    canDeleteOwnMessages:  !isSubscriber,
    canDeleteAnyMessage:   false,
    canEditAnyChannelPost: false,
    canPinMessages:        !isSubscriber && chatAllowsPin,
    canInviteUsers:        !isSubscriber && chat.allowMemberInvites,
    canCreateInviteLink:   false,
    canApproveJoinRequests: false,
    canViewMemberList:     !isSubscriber,
    canViewSubscriberList: false,
    canRestrictMembers:    false,
    canKickMembers:        false,
    canBanMembers:         false,
    canUnbanMembers:       false,
    canEditChatInfo:       false,
    canManageAdmins:       false,
    canManageVoiceChats:   false,
    canTransferOwnership:  false,
    denialReasons:         reasons,
  };
}

/**
 * Applies per-member restriction overlay.
 * Restrictions can ONLY reduce capabilities — never expand them (AND semantics).
 * Expired restrictions (until < now) are ignored.
 */
function applyRestrictionOverlay(
  base: EffectivePermissions,
  restriction: MemberRestrictions,
  until: Date | null | undefined,
): EffectivePermissions {
  const reasons = { ...base.denialReasons };
  const untilLabel = until ? ` until ${until.toLocaleDateString()}` : '';

  if (!restriction.canSendMessages && base.canSendMessages) {
    reasons.canSendMessages = `You are restricted from sending messages${untilLabel}`;
  }
  if (!restriction.canSendMedia && base.canSendMedia) {
    reasons.canSendMedia = `You are restricted from sending media${untilLabel}`;
  }
  if (!restriction.canInviteUsers && base.canInviteUsers) {
    reasons.canInviteUsers = `You are restricted from inviting users${untilLabel}`;
  }

  return {
    ...base,
    canSendMessages:       base.canSendMessages       && restriction.canSendMessages,
    canSendMedia:          base.canSendMedia           && restriction.canSendMedia,
    canSendStickersAndGifs: base.canSendStickersAndGifs && restriction.canSendStickersAndGifs,
    canSendPolls:          base.canSendPolls           && restriction.canSendPolls,
    canAddLinkPreviews:    base.canAddLinkPreviews     && restriction.canAddLinkPreviews,
    canInviteUsers:        base.canInviteUsers         && restriction.canInviteUsers,
    denialReasons:         reasons,
  };
}

function buildDenied(reason: string): EffectivePermissions {
  const reasons: EffectivePermissions['denialReasons'] = {};
  const denied: EffectivePermissions = {
    canRead: false,
    canSendMessages: false,
    canSendMedia: false,
    canSendStickersAndGifs: false,
    canSendPolls: false,
    canAddLinkPreviews: false,
    canEditOwnMessages: false,
    canDeleteOwnMessages: false,
    canDeleteAnyMessage: false,
    canEditAnyChannelPost: false,
    canPinMessages: false,
    canInviteUsers: false,
    canCreateInviteLink: false,
    canApproveJoinRequests: false,
    canViewMemberList: false,
    canViewSubscriberList: false,
    canRestrictMembers: false,
    canKickMembers: false,
    canBanMembers: false,
    canUnbanMembers: false,
    canEditChatInfo: false,
    canManageAdmins: false,
    canManageVoiceChats: false,
    canTransferOwnership: false,
    denialReasons: reasons,
  };
  // Attach the single reason to every capability key for UI convenience
  for (const key of Object.keys(denied) as Array<keyof typeof denied>) {
    if (key !== 'denialReasons') {
      (reasons as Record<string, string>)[key] = reason;
    }
  }
  return denied;
}

function isRestrictionExpired(until: Date | null | undefined): boolean {
  if (!until) return false;
  return until.getTime() <= Date.now();
}
