/**
 * Unit tests for chat-permissions.ts
 *
 * Run with:
 *   node --experimental-strip-types --test src/chat/permissions/chat-permissions.spec.ts
 *
 * The permission engine is pure TypeScript — no NestJS, no DB, no mocks needed.
 * Tests are grouped by concern and cover every branch in getEffectivePermissions.
 */

import { describe, it } from 'node:test';
import assert from 'node:assert/strict';

import {
  getEffectivePermissions,
  canActorModerateTarget,
  canActorConfigureAdmin,
  sanitiseGrantedAdminPermissions,
  deriveParticipationType,
  DEFAULT_ADMIN_PERMISSIONS,
  MUTED_RESTRICTIONS,
  NO_RESTRICTIONS,
  type AdminPermissions,
  type MemberRestrictions,
  type MemberInput,
  type ChatInput,
  type ChatPermissionsInput,
} from './chat-permissions.js';

// ── Helpers ───────────────────────────────────────────────────────────────────

function groupChat(overrides: Partial<ChatInput> = {}): ChatInput {
  return { type: 'group', allowMemberInvites: true, ...overrides };
}

function channelChat(overrides: Partial<ChatInput> = {}): ChatInput {
  return { type: 'channel', allowMemberInvites: false, ...overrides };
}

function activeMember(overrides: Partial<MemberInput> = {}): MemberInput {
  return { role: 'member', status: 'active', ...overrides };
}

function activeOwner(overrides: Partial<MemberInput> = {}): MemberInput {
  return { role: 'owner', status: 'active', ...overrides };
}

function activeAdmin(ap: Partial<AdminPermissions> = {}, overrides: Partial<MemberInput> = {}): MemberInput {
  return {
    role: 'admin',
    status: 'active',
    adminPermissions: { ...DEFAULT_ADMIN_PERMISSIONS, ...ap },
    ...overrides,
  };
}

// ── deriveParticipationType ───────────────────────────────────────────────────

describe('deriveParticipationType', () => {
  it('group + any role → member', () => {
    assert.equal(deriveParticipationType('group', 'owner'), 'member');
    assert.equal(deriveParticipationType('group', 'admin'), 'member');
    assert.equal(deriveParticipationType('group', 'member'), 'member');
  });

  it('channel + owner/admin → member', () => {
    assert.equal(deriveParticipationType('channel', 'owner'), 'member');
    assert.equal(deriveParticipationType('channel', 'admin'), 'member');
  });

  it('channel + member → subscriber', () => {
    assert.equal(deriveParticipationType('channel', 'member'), 'subscriber');
  });

  it('direct + any role → member', () => {
    assert.equal(deriveParticipationType('direct', 'member'), 'member');
    assert.equal(deriveParticipationType('direct', 'owner'), 'member');
  });
});

// ── Non-active status: deny everything ───────────────────────────────────────

describe('getEffectivePermissions — inactive statuses', () => {
  const statuses = ['banned', 'left', 'removed', 'invited', 'requested'] as const;

  for (const status of statuses) {
    it(`status=${status} → canRead=false, canSendMessages=false`, () => {
      const perms = getEffectivePermissions({ role: 'member', status }, groupChat());
      assert.equal(perms.canRead, false);
      assert.equal(perms.canSendMessages, false);
      assert.equal(perms.canBanMembers, false);
      assert.equal(perms.canTransferOwnership, false);
      // denialReasons populated for at least canRead
      assert.ok(perms.denialReasons.canRead, `expected denialReason for status=${status}`);
    });
  }
});

// ── Owner permissions ─────────────────────────────────────────────────────────

describe('getEffectivePermissions — owner', () => {
  it('owner in group has all permissions', () => {
    const perms = getEffectivePermissions(activeOwner(), groupChat());
    assert.equal(perms.canRead, true);
    assert.equal(perms.canSendMessages, true);
    assert.equal(perms.canBanMembers, true);
    assert.equal(perms.canManageAdmins, true);
    assert.equal(perms.canTransferOwnership, true);
    assert.equal(perms.canKickMembers, true);
    assert.equal(perms.canRestrictMembers, true);
    assert.equal(perms.canEditChatInfo, true);
    assert.deepEqual(perms.denialReasons, {});
  });

  it('owner in channel has all permissions', () => {
    const perms = getEffectivePermissions(activeOwner(), channelChat());
    assert.equal(perms.canSendMessages, true);
    assert.equal(perms.canTransferOwnership, true);
  });
});

// ── Admin permissions ─────────────────────────────────────────────────────────

describe('getEffectivePermissions — admin', () => {
  it('admin with canBanUsers=true can ban/kick/restrict', () => {
    const perms = getEffectivePermissions(activeAdmin({ canBanUsers: true }), groupChat());
    assert.equal(perms.canBanMembers, true);
    assert.equal(perms.canKickMembers, true);
    assert.equal(perms.canRestrictMembers, true);
    assert.equal(perms.canApproveJoinRequests, true);
  });

  it('admin with canBanUsers=false cannot ban/kick/restrict', () => {
    const perms = getEffectivePermissions(activeAdmin({ canBanUsers: false }), groupChat());
    assert.equal(perms.canBanMembers, false);
    assert.equal(perms.canKickMembers, false);
    assert.equal(perms.canRestrictMembers, false);
  });

  it('admin canManageAdmins propagates', () => {
    const withManage = getEffectivePermissions(activeAdmin({ canManageAdmins: true }), groupChat());
    const withoutManage = getEffectivePermissions(activeAdmin({ canManageAdmins: false }), groupChat());
    assert.equal(withManage.canManageAdmins, true);
    assert.equal(withoutManage.canManageAdmins, false);
  });

  it('admin cannot transfer ownership', () => {
    const perms = getEffectivePermissions(activeAdmin(), groupChat());
    assert.equal(perms.canTransferOwnership, false);
  });

  it('admin in channel: canPostMessages gates canSendMessages', () => {
    const canPost = getEffectivePermissions(activeAdmin({ canPostMessages: true }), channelChat());
    const noPost = getEffectivePermissions(activeAdmin({ canPostMessages: false }), channelChat());
    assert.equal(canPost.canSendMessages, true);
    assert.equal(noPost.canSendMessages, false);
  });

  it('admin in channel cannot send stickers or polls', () => {
    const perms = getEffectivePermissions(activeAdmin({ canPostMessages: true }), channelChat());
    assert.equal(perms.canSendStickersAndGifs, false);
    assert.equal(perms.canSendPolls, false);
  });

  it('admin with no adminPermissions falls back to DEFAULT_ADMIN_PERMISSIONS', () => {
    const perms = getEffectivePermissions(
      { role: 'admin', status: 'active', adminPermissions: null },
      groupChat(),
    );
    assert.equal(perms.canBanMembers, DEFAULT_ADMIN_PERMISSIONS.canBanUsers);
    assert.equal(perms.canManageAdmins, DEFAULT_ADMIN_PERMISSIONS.canManageAdmins);
  });
});

// ── Member (group) permissions ────────────────────────────────────────────────

describe('getEffectivePermissions — member in group', () => {
  it('can send messages by default', () => {
    const perms = getEffectivePermissions(activeMember(), groupChat());
    assert.equal(perms.canSendMessages, true);
    assert.equal(perms.canSendMedia, true);
    assert.equal(perms.canSendStickersAndGifs, true);
    assert.equal(perms.canSendPolls, true);
  });

  it('chat-wide canSendMessages=false blocks member sending', () => {
    const chatPerms: ChatPermissionsInput = { canSendMessages: false, canAddMembers: true, canPinMessages: false };
    const perms = getEffectivePermissions(activeMember(), groupChat(), chatPerms);
    assert.equal(perms.canSendMessages, false);
    assert.ok(perms.denialReasons.canSendMessages);
  });

  it('canPinMessages follows chat-wide permission', () => {
    const withPin = getEffectivePermissions(
      activeMember(),
      groupChat(),
      { canSendMessages: true, canAddMembers: true, canPinMessages: true },
    );
    const withoutPin = getEffectivePermissions(
      activeMember(),
      groupChat(),
      { canSendMessages: true, canAddMembers: true, canPinMessages: false },
    );
    assert.equal(withPin.canPinMessages, true);
    assert.equal(withoutPin.canPinMessages, false);
  });

  it('member cannot ban/kick/restrict/manage admins', () => {
    const perms = getEffectivePermissions(activeMember(), groupChat());
    assert.equal(perms.canBanMembers, false);
    assert.equal(perms.canKickMembers, false);
    assert.equal(perms.canRestrictMembers, false);
    assert.equal(perms.canManageAdmins, false);
    assert.equal(perms.canTransferOwnership, false);
  });

  it('allowMemberInvites=false removes canInviteUsers for member', () => {
    const perms = getEffectivePermissions(activeMember(), groupChat({ allowMemberInvites: false }));
    assert.equal(perms.canInviteUsers, false);
  });

  it('allowMemberInvites=true gives member canInviteUsers', () => {
    const perms = getEffectivePermissions(activeMember(), groupChat({ allowMemberInvites: true }));
    assert.equal(perms.canInviteUsers, true);
  });
});

// ── Subscriber (channel member) permissions ───────────────────────────────────

describe('getEffectivePermissions — subscriber (channel member)', () => {
  it('subscriber cannot send anything', () => {
    const perms = getEffectivePermissions(activeMember(), channelChat());
    assert.equal(perms.canSendMessages, false);
    assert.equal(perms.canSendMedia, false);
    assert.equal(perms.canSendStickersAndGifs, false);
    assert.equal(perms.canSendPolls, false);
    assert.ok(perms.denialReasons.canSendMessages);
  });

  it('subscriber can read', () => {
    const perms = getEffectivePermissions(activeMember(), channelChat());
    assert.equal(perms.canRead, true);
  });

  it('subscriber cannot view member list or invite', () => {
    const perms = getEffectivePermissions(activeMember(), channelChat());
    assert.equal(perms.canViewMemberList, false);
    assert.equal(perms.canInviteUsers, false);
  });
});

// ── Restriction overlay ───────────────────────────────────────────────────────

describe('getEffectivePermissions — restriction overlay', () => {
  it('mute restriction blocks all sending', () => {
    const perms = getEffectivePermissions(
      activeMember({ restriction: MUTED_RESTRICTIONS }),
      groupChat(),
    );
    assert.equal(perms.canSendMessages, false);
    assert.equal(perms.canSendMedia, false);
    assert.equal(perms.canSendStickersAndGifs, false);
    assert.equal(perms.canSendPolls, false);
    assert.ok(perms.denialReasons.canSendMessages);
  });

  it('mute restriction preserves canInviteUsers (mute only silences, not banishes)', () => {
    const perms = getEffectivePermissions(
      activeMember({ restriction: MUTED_RESTRICTIONS }),
      groupChat({ allowMemberInvites: true }),
    );
    assert.equal(perms.canInviteUsers, true);
  });

  it('expired restriction is ignored (lazy expiry)', () => {
    const past = new Date(Date.now() - 1000);
    const perms = getEffectivePermissions(
      activeMember({ restriction: MUTED_RESTRICTIONS, restrictionUntil: past }),
      groupChat(),
    );
    assert.equal(perms.canSendMessages, true, 'expired restriction must be ignored');
  });

  it('active timed restriction is applied', () => {
    const future = new Date(Date.now() + 60_000);
    const perms = getEffectivePermissions(
      activeMember({ restriction: MUTED_RESTRICTIONS, restrictionUntil: future }),
      groupChat(),
    );
    assert.equal(perms.canSendMessages, false);
  });

  it('permanent restriction (no until) is applied', () => {
    const perms = getEffectivePermissions(
      activeMember({ restriction: MUTED_RESTRICTIONS, restrictionUntil: null }),
      groupChat(),
    );
    assert.equal(perms.canSendMessages, false);
  });

  it('restriction can only reduce, not expand permissions', () => {
    // subscriber in channel already cannot send — restriction makes no difference
    const permsBefore = getEffectivePermissions(activeMember(), channelChat());
    const permsAfter = getEffectivePermissions(
      activeMember({ restriction: NO_RESTRICTIONS }), // "unrestrict" on subscriber
      channelChat(),
    );
    // canSendMessages stays false regardless — role overrides restriction
    assert.equal(permsBefore.canSendMessages, false);
    assert.equal(permsAfter.canSendMessages, false);
  });

  it('partial restriction: canSendMedia=false, canSendMessages still true', () => {
    const mediaOnly: MemberRestrictions = { ...NO_RESTRICTIONS, canSendMedia: false };
    const perms = getEffectivePermissions(
      activeMember({ restriction: mediaOnly }),
      groupChat(),
    );
    assert.equal(perms.canSendMessages, true);
    assert.equal(perms.canSendMedia, false);
  });
});

// ── canActorModerateTarget ────────────────────────────────────────────────────

describe('canActorModerateTarget', () => {
  it('nobody can moderate the owner', () => {
    assert.equal(canActorModerateTarget('admin', 'owner'), false);
    assert.equal(canActorModerateTarget('owner', 'owner'), false);
  });

  it('only owner can moderate another admin', () => {
    assert.equal(canActorModerateTarget('owner', 'admin'), true);
    assert.equal(canActorModerateTarget('admin', 'admin'), false);
  });

  it('owner and admin can moderate members', () => {
    assert.equal(canActorModerateTarget('owner', 'member'), true);
    assert.equal(canActorModerateTarget('admin', 'member'), true);
  });
});

// ── canActorConfigureAdmin ────────────────────────────────────────────────────

describe('canActorConfigureAdmin', () => {
  it('owner can always configure any admin', () => {
    assert.equal(canActorConfigureAdmin('owner', false, 'other_user', 'actor_id'), true);
    assert.equal(canActorConfigureAdmin('owner', false, null, 'actor_id'), true);
  });

  it('admin without canManageAdmins cannot configure anyone', () => {
    assert.equal(canActorConfigureAdmin('admin', false, 'actor_id', 'actor_id'), false);
  });

  it('admin with canManageAdmins can configure their own promotee', () => {
    assert.equal(canActorConfigureAdmin('admin', true, 'actor_id', 'actor_id'), true);
  });

  it('admin with canManageAdmins cannot configure another admin\'s promotee', () => {
    assert.equal(canActorConfigureAdmin('admin', true, 'other_admin', 'actor_id'), false);
    assert.equal(canActorConfigureAdmin('admin', true, null, 'actor_id'), false);
  });
});

// ── sanitiseGrantedAdminPermissions ──────────────────────────────────────────

describe('sanitiseGrantedAdminPermissions', () => {
  const actorPerms: AdminPermissions = {
    ...DEFAULT_ADMIN_PERMISSIONS,
    canBanUsers: true,
    canInviteUsers: true,
    canManageAdmins: false,
    canPostMessages: true,
  };

  it('cannot grant a permission the actor does not have', () => {
    const result = sanitiseGrantedAdminPermissions(actorPerms, {
      canManageAdmins: true,  // actor does not have this
    });
    assert.equal(result.canManageAdmins, false);
  });

  it('can grant a permission the actor has', () => {
    const result = sanitiseGrantedAdminPermissions(actorPerms, {
      canBanUsers: true,
    });
    assert.equal(result.canBanUsers, true);
  });

  it('requesting false when actor has true → result is false', () => {
    const result = sanitiseGrantedAdminPermissions(actorPerms, {
      canBanUsers: false,  // explicitly downgrade
    });
    assert.equal(result.canBanUsers, false);
  });

  it('unspecified flag defaults from DEFAULT_ADMIN_PERMISSIONS then ANDs with actor', () => {
    // DEFAULT_ADMIN_PERMISSIONS.canDeleteMessages = true; actorPerms inherits true
    const result = sanitiseGrantedAdminPermissions(actorPerms, {});
    assert.equal(result.canDeleteMessages, actorPerms.canDeleteMessages && DEFAULT_ADMIN_PERMISSIONS.canDeleteMessages);
  });

  it('customTitle is passed through unchanged', () => {
    const result = sanitiseGrantedAdminPermissions(actorPerms, { customTitle: 'Moderator' });
    assert.equal(result.customTitle, 'Moderator');
  });

  it('sanitised result is a complete AdminPermissions object', () => {
    const result = sanitiseGrantedAdminPermissions(actorPerms, {});
    const requiredKeys: Array<keyof AdminPermissions> = [
      'canChangeInfo', 'canDeleteMessages', 'canBanUsers', 'canInviteUsers',
      'canPinMessages', 'canManageAdmins', 'canPostMessages', 'canEditMessages',
      'canManageVoiceChats', 'isAnonymous',
    ];
    for (const key of requiredKeys) {
      assert.ok(key in result, `missing key: ${key}`);
    }
  });
});
