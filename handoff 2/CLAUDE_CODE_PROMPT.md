You are continuing an iOS React Native redesign in an existing production codebase.

Project root:
`/Users/judyannmartos/Movies/telegram`

Primary target:
`apps/mobile-ios/src`

Design source of truth:
- `handoff/README.md`
- `handoff/Analog Design.html`

Important context:
The main 11 handoff screens have already been applied. Do NOT redesign them again unless a small consistency fix is required.
Already covered:
- `src/features/auth/screens/SplashScreen.tsx`
- `src/features/auth/screens/PhoneEntryScreen.tsx`
- `src/features/auth/screens/OtpVerificationScreen.tsx`
- `src/features/auth/screens/ProfileSetupScreen.tsx`
- `src/features/chats/screens/ChatListScreen.tsx`
- `src/features/messages/screens/ChatScreen.tsx`
- `src/features/messages/screens/ChatThreadScreen.tsx`
- `src/features/contacts/screens/ContactsScreen.tsx`
- `src/features/profile/screens/ProfileScreen.tsx`
- `src/features/settings/screens/SettingsHomeScreen.tsx`
- `src/features/profile/screens/EditProfileScreen.tsx`
- active call UI via `src/features/calls/components/CallOverlay.tsx`

Your job:
Finish the redesign for the remaining screens in `apps/mobile-ios/src` that are still legacy or only partially updated, so the rest of the app matches the new handoff language.

Goals:
1. Audit all remaining screens in `apps/mobile-ios/src/features/**/screens/*` and any screen-like overlays/components that are still visibly legacy.
2. Identify which screens are:
   - fully redesigned
   - partially redesigned
   - still legacy
3. Implement the missing redesign work for the remaining screens only.
4. Keep the visual language consistent with the already-applied handoff:
   - use the existing tokens in `src/shared/ui/ios/theme.ts`
   - use existing shared iOS primitives where appropriate
   - preserve spacing, card treatment, pills, shadows, typography, and color language already introduced

Hard constraints:
- Do NOT rewrite app architecture
- Do NOT change send/retry/realtime behavior
- Do NOT change auth/session logic
- Do NOT remove old working flows unless replacing only the visual layer
- Do NOT introduce new dependencies
- Do NOT redesign the already-finished 11 handoff screens from scratch
- Make minimal, focused, maintainable changes
- Follow the existing project structure and conventions
- Preserve current business logic and navigation behavior

Priority for remaining redesign work:
1. chat-adjacent legacy screens
2. settings sub-screens
3. profile/chat management screens
4. secondary utility screens

Likely remaining targets include screens such as:
- `src/features/chats/screens/ChatInfoScreen.tsx`
- `src/features/chats/screens/GlobalSearchScreen.tsx`
- `src/features/chats/screens/JoinChatScreen.tsx`
- `src/features/chats/screens/CreateGroupScreen.tsx`
- `src/features/chats/screens/CreateChannelScreen.tsx`
- `src/features/chats/screens/EditChatScreen.tsx`
- `src/features/chats/screens/AddChatMembersScreen.tsx`
- `src/features/chats/screens/InviteLinksScreen.tsx`
- `src/features/settings/screens/AppearanceSettingsScreen.tsx`
- `src/features/settings/screens/NotificationSettingsScreen.tsx`
- `src/features/settings/screens/DataAndStorageScreen.tsx`
- `src/features/settings/screens/PrivacySettingsScreen.tsx`
- `src/features/settings/screens/DevicesScreen.tsx`
- `src/features/settings/screens/HelpAndAboutScreen.tsx`
- and other remaining screen files in `apps/mobile-ios/src/features/**/screens`

Execution rules:
- First inspect the codebase and produce a redesign audit.
- Then implement the missing redesign work screen by screen.
- Reuse existing tokens/components instead of duplicating styles.
- If a screen has no exact handoff equivalent, adapt it into the same visual system rather than inventing a separate style.
- Prefer style/layout refactors over logic changes.
- Keep TypeScript clean.

Required output format:
1. Audit:
   - list all remaining screens
   - mark each as `done`, `partial`, or `legacy`
2. Implementation:
   - files changed
   - what visual changes were applied
3. Final report:
   - what is now fully covered
   - what still remains, if anything
4. Verification:
   - run `npm run typecheck --workspace=@telegram/mobile-ios`

Definition of done:
- All screen surfaces in `apps/mobile-ios/src/features/**/screens` and screen-like UI overlays relevant to the user-facing app are visually aligned with the new handoff design language
- No business logic regressions
- Typecheck passes
