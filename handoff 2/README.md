# Handoff: Analog — Full App Redesign

## Overview

This package contains high-fidelity screen designs for **Analog**, a React Native (iOS) messaging app. The designs cover all 11 screens of the application — the full auth flow and all main app screens.

## About the Design Files

The files in this bundle (`Analog Design.html`, `ios-frame.jsx`, `tweaks-panel.jsx`) are **interactive design prototypes built in HTML/React** — they show the intended look, layout, and behavior, but are **not production code**. Your task is to **recreate these designs in the existing React Native codebase** at `apps/mobile-ios/src/`, following the existing file structure, component patterns, and libraries already in use.

> Open `Analog Design.html` in a browser to see all 11 screens side-by-side in an iOS frame. Every screen is fully interactive and navigable.

## Fidelity

**High-fidelity.** These are pixel-complete mockups with final colors, typography, spacing, shadows, and interaction states. Recreate them as closely as possible in React Native using StyleSheet — the existing `theme.ts` tokens are already aligned with the design.

---

## Design Tokens

These map directly to `apps/mobile-ios/src/shared/ui/ios/theme.ts`.

### Colors
```ts
appBackground:  '#F2F3F7'   // Screen background
surface:        '#FFFFFF'   // Cards, rows
surfaceMid:     '#EDEEF3'   // Search bars, muted inputs
surfaceMuted:   '#E4E5EC'   // Inactive pills, chips
separator:      '#E0E2EA'   // Row dividers

textPrimary:    '#1A1D2E'   // Main text (dark navy)
textSecondary:  '#6B6F82'   // Subtitles, hints
textTertiary:   '#9EA2B3'   // Timestamps, labels

accent:         '#D4943A'   // Primary CTA, links (amber)
accentSoft:     '#F5EAD8'   // Accent tinted backgrounds
accentDeep:     '#B97A28'   // Pressed state for accent buttons

bubble:         '#DDD5F3'   // Outgoing message bubble (soft lavender)
badge:          '#7B6CB7'   // Unread badge, badge tints (purple)
badgeSoft:      '#EDE9F8'   // Badge background tint

online:         '#4F8A5B'   // Online indicator dot
onlineSoft:     '#E3F0E7'   // Online tinted background
destructive:    '#B5473E'   // Errors, danger actions
destructSoft:   '#F5E5E4'   // Destructive tinted background
```

### Typography — use `DM Sans` (already compatible with system fonts on iOS via expo-google-fonts or similar)

| Role         | Size | Weight | Usage                          |
|-------------|------|--------|--------------------------------|
| largeTitle  | 28px | 800    | Screen titles (Chats, Settings)|
| sectionTitle| 22px | 800    | Auth screen headings            |
| navTitle    | 17px | 700    | Navigation bar title           |
| rowTitle    | 16px | 600    | Chat row name, settings row    |
| body        | 15px | 400    | Message text, body copy        |
| secondary   | 14px | 400    | Subtitles, last message preview|
| caption     | 12px | 500    | Timestamps, section headers    |
| mono        | DM Mono, monospace | 700 | OTP cells, phone preview |

### Spacing & Radius
```
screenPadding:   16–20px
sectionRadius:   14px       (IosSection cards)
rowHeight:       ~68px      (chat rows, settings rows)
avatarSize:      52px (list), 44px (compact), 88px (profile hero)
composerHeight:  ~52px min
buttonRadius:    14px        (primary buttons)
bubbleRadius:    18px / 6px  (full / grouped-side)
pillRadius:      999px        (chips, badges)
navBarBlur:      backdrop-filter: blur(12px)
```

### Shadows
```
card:    0 2px 12px rgba(0,0,0,0.06)
button:  0 4px 16px <accentColor>44
bubble:  0 1px 4px rgba(0,0,0,0.07)
avatar:  0 2px 8px <avatarColor>44
```

---

## Screens

### 01 — Splash Screen
**File:** `src/features/auth/screens/SplashScreen.tsx`

**Layout:** Full-screen flex column, centered, dark gradient background (`#1A1D2E → #2C2340`).

**Components:**
- Logo mark: 96×96px, `borderRadius: 28`, amber gradient, custom "A" SVG icon with triangle + dot
- App name: "Analog", 32px, weight 800, white, `letterSpacing: -1`
- Tagline: 15px, `rgba(255,255,255,0.45)`, centered
- **"Get Started" button**: full-width, 15px padding, `borderRadius: 14`, amber gradient, white text 16/700, shadow `0 6px 24px #D4943A55`
- **"Sign In" button**: full-width, same shape, `background: rgba(255,255,255,0.1)`, `backdropFilter: blur(8px)`, text `rgba(255,255,255,0.8)`
- Footer: 12px, `rgba(255,255,255,0.25)`, centered, 2-line

---

### 02 — Phone Entry Screen
**File:** `src/features/auth/screens/PhoneEntryScreen.tsx`

**Layout:** `background: T.bg`. Scroll view. Top back button. Icon badge. Large heading + subtitle. Form.

**Components:**
- Icon badge: 52×52, `borderRadius: 15`, `accentSoft` bg, 📱 emoji, 26px
- Heading: "Your number", 26px/800
- Country selector: white card, `borderRadius: 14`, flag + country name + dial code + chevron
- Dial code pill: separate fixed-width (~60px) `accentSoft` background, amber text
- Phone input: flex 1, white card `borderRadius: 12`, 18px/500
- Preview card (appears when typing): `accentSoft` bg, amber border `33` opacity, "Full number" label + formatted number in `DM Mono`
- **Primary button**: "Send Code", full-width, disabled until ≥7 digits
- Country picker bottom sheet: dark scrim, white sheet `borderTopRadius: 24`, drag handle, list of countries

---

### 03 — OTP Verification Screen
**File:** `src/features/auth/screens/OtpVerificationScreen.tsx`

**Layout:** Same auth shell. 6 digit cells + timer row + primary button.

**Components:**
- Icon badge: 52×52, `badgeSoft` bg, 🔐 emoji
- **6 OTP cells**: equal flex columns, gap 8. Each cell: `borderRadius: 14`, height ~54px. States:
  - Empty: `surface` bg, `separator` border 2px
  - Filled: `accentSoft` bg, `accent` border 2px
  - Active: `accent` border 2px
  - Digit text: 24px/800, `DM Mono`
- Timer row: small circular badge (28px) with MM:SS countdown in `DM Mono`, amber color while active. "Resend code →" button appears when timer hits 0
- Error/status text below button

---

### 04 — Profile Setup Screen
**File:** `src/features/auth/screens/ProfileSetupScreen.tsx`

**Layout:** Scroll view. Icon badge, heading, avatar picker row, 4 inputs, live preview card, primary button.

**Components:**
- Avatar picker: white card, `borderRadius: 18`, box-shadow. 68px circle (amber gradient when name entered, muted otherwise). "Upload photo →" text button in amber
- Input fields: `surfaceMid` bg, `borderRadius: 12`, 16px text, 52px min height
- Username availability: 12px green/red helper text below field
- **Preview card**: white card, `borderRadius: 16`, 44px avatar + name + `@username` side-by-side. Only shown when name/username entered
- Live preview updates on every keystroke

---

### 05 — Chat List Screen
**File:** `src/features/chats/screens/ChatListScreen.tsx`

**Layout:** Sticky header (nav bar + search + filter pills) + scrollable list.

**Header:**
- "Messages" large title 28px/800
- Compose button: 34×34 circle, `accentSoft` bg, ✎ icon
- Search bar: `surfaceMid` bg, `borderRadius: 12`, 🔍 prefix, clear button
- Filter pills: "All", "Unread", "Groups" — inactive: `surfaceMuted` bg / `textSecondary` text; active: `accent` bg / white text, `borderRadius: 999`

**Chat Row (68px approx):**
- 52px avatar with online dot (bottom-right, 13px, `online` color, white border 2px)
- Name: 16px/700 if unread, /600 if read
- Last message: 14px `textSecondary`, 1 line truncated
- Timestamp: 12px, amber if unread
- Unread badge: `badge` purple bg, white text 11/700, `borderRadius: 999`, min-width 20px, height 20px
- Group icon prefix (👥) for group chats, (📢) for channels
- Row divider: `separator` at 88% opacity

**Empty state:** centered icon + heading + subtitle

---

### 06 — Messages Screen
**File:** `src/features/messages/screens/ChatScreen.tsx` (and `ChatThreadScreen.tsx`)

**Layout:** Nav bar + inverted FlatList + composer bar.

**Nav bar:**
- Back chevron (‹) in amber
- 38px avatar + name (16/700) + online status (12px green/gray) — tappable → Profile
- 📞 and ⋯ icon buttons

**Message bubbles:**
- Max width 75%
- Incoming: `surface` white, shadow `0 1px 4px rgba(0,0,0,0.07)`
- Outgoing: `#DDD5F3` lavender, shadow `0 2px 8px #7B6CB722`
- Grouped radius logic:
  - Single: all 18px except sender-side bottom → 6px
  - First in group: top-sender-side → 18px, bottom-sender-side → 6px
  - Middle: both sender-side → 6px
  - Last: top-sender-side → 6px, bottom-sender-side → 18px
- Padding: 10px 14px
- Text: 15px/1.45 line-height
- Timestamp: 11px, inside bubble, right-aligned, muted purple for outgoing
- Read receipt: ✓ (sent) / ✓✓ (delivered) / ✓✓ amber (read)
- Spacing: 1px between grouped, 6px between groups, 4px top padding for first in group

**Typing indicator:** 3 dots bouncing, `textTertiary` color, white bubble, same radius as incoming "first"

**Composer:**
- `navBg` with `backdropFilter: blur(12px)`
- 📎 button: 36px circle, `surfaceMid` bg
- Text input container: `surface` white, `borderRadius: 22`, shadow, 😊 emoji button inside
- Send button: 36px circle; when input has text → `accent` bg + ↑ icon + shadow; empty → `surfaceMid` + 🎤

---

### 07 — Contacts Screen
**File:** `src/features/contacts/screens/ContactsScreen.tsx`

**Layout:** Sticky header + alphabetically grouped list.

**Components:**
- "Invite a friend" row at top: 50px circle `accentSoft` with ➕, amber title, gray subtitle
- Section headers: 12px/700, `textTertiary`, uppercase, 1.2 letter-spacing
- Contact row: 50px avatar + name (16/600) + @username (amber) or "Saved contact" (gray) + online dot
- Online dot: 8px circle, `online` green, right side of row

---

### 08 — Profile View Screen
**File:** `src/features/profile/screens/ProfileScreen.tsx`

**Layout:** Sticky nav bar + hero section + info sections (scrollable).

**Hero:**
- Background: subtle gradient `accentColor22 → badge11`
- 88px avatar centered
- Name: 24px/800, `textPrimary`
- @username: 15px/600, `accent`
- Online status: 13px/500, green or gray
- Two action buttons side-by-side (flex):
  - Message: `accent` bg, amber shadow, white text 14/700
  - Call: `surface` bg, subtle shadow, dark text

**Info sections:** standard `IosSection` cards
**Media grid:** 3-column grid, 1:1 aspect-ratio tiles, `borderRadius: 10`

---

### 09 — Settings Screen
**File:** `src/features/settings/screens/SettingsHomeScreen.tsx`

**Layout:** Sticky "Settings" large title + scrollable sections.

**Profile card** (top, above sections):
- White card, `borderRadius: 18`, shadow `0 2px 12px rgba(0,0,0,0.06)`, amber border `separator`
- 60px avatar + name (19/800) + @username (amber) + "Tap to edit profile" (gray 13px) + chevron

**Settings rows:**
- Icon: 32×32, `borderRadius: 9`, tint-colored background (22% opacity), emoji icon 17px
- Label: 16px/500
- Value (optional): 13px `textTertiary`
- Chevron: `textTertiary`, 14px `›`
- Danger rows: `destructSoft` icon bg, `destructive` text, no chevron

**Sections:** Account, Appearance, Storage, Support + Sign Out

---

### 10 — Edit Profile Screen
**File:** `src/features/profile/screens/EditProfileScreen.tsx`

**Layout:** Nav bar (Cancel | "Edit Profile" | Save) + scroll view.

**Components:**
- Avatar: 90px centered, amber gradient, edit badge (28px amber circle with ✎, bottom-right, white border 2px)
- Two white cards (`borderRadius: 14`, padding 16px): one for First/Last name, one for Username + Bio
- Bio: multiline textarea, `surfaceMid` bg, `borderRadius: 12`
- Helper text: 12px green for available username
- Disclaimer text: 12px `textTertiary`

---

### 11 — Active Call Screen
**File:** `src/features/calls/` (CallScreen or similar)

**Layout:** Full-screen, dark gradient background (`#1A1D2E → #2C2340 → #1a2a1a`). Two zones: top (avatar + info + waveform) and bottom (controls + end button).

**Components:**
- 100px avatar
- Name: 28px/800, white
- Duration timer: 15px, `rgba(255,255,255,0.6)`, DM Mono
- Waveform: 24 vertical bars, 3px wide, rounded, varying heights, white with 30–70% opacity, animated
- Control buttons (3-column grid):
  - 56px circles, `rgba(255,255,255,0.12)` default, `accent` amber when active
  - Mute (🎤/🔇), Video (📹), Speaker (📢/🔊)
  - Label: 12px, `rgba(255,255,255,0.6)`, below each button
- End call button: 72px circle, `destructive` red, 📵 icon, shadow `0 6px 24px #B5473E55`

---

## Navigation Structure

```
RootNavigator
├── Auth Stack
│   ├── SplashScreen          → navigate('phone')
│   ├── PhoneEntryScreen      → navigate('otp')
│   ├── OtpVerificationScreen → navigate('profilesetup') | back to phone
│   └── ProfileSetupScreen    → navigate('chatlist') on success
│
└── Main Tab Navigator
    ├── Tab: Chats
    │   ├── ChatListScreen     → navigate('ChatThread', {chatId})
    │   ├── ChatThreadScreen   → navigate('Profile', {userId})
    │   └── (various sub-screens: GlobalSearch, CreateGroup, etc.)
    │
    ├── Tab: Contacts          (ContactsScreen)
    │   └── → ProfileScreen
    │
    └── Tab: Settings          (SettingsHomeScreen)
        └── → EditProfileScreen, DevicesScreen, etc.
```

**Tab bar design:**
- `navBg` with `backdropFilter: blur(12px)`, top `separator` border
- 3 tabs: Chats (💬), Contacts (👥), Settings (⚙️)
- Active: `accent` amber label; inactive: `textTertiary` label, 60% opacity icon
- Icon: 22px emoji; Label: 10px/700, uppercase feel

---

## Interactions & Animations

| Interaction | Behavior |
|---|---|
| Button press | `opacity: 0.72` or `background` darkens to `accentDeep` |
| Row tap | Background flashes to `surfaceMid`, transition 100ms |
| Chat row swipe-left | Reveal Pin / Mute / Archive / Delete actions (existing Swipeable) |
| OTP auto-submit | When all 6 digits filled → auto-trigger verify |
| Typing indicator | 3 dots bounce with staggered delay (0, 150ms, 300ms), `translateY(-4px)` |
| Send button | Morphs from 🎤 (gray) to ↑ (amber) as user types |
| Profile photo tap | Spring scale animation on avatar |
| Bottom sheet | Slides up from bottom, dark scrim fades in |

---

## Avatar Color System

Generate deterministic avatar background color from name:
```ts
const AVATAR_COLORS = [
  '#D4943A', // amber (accent)
  '#7B6CB7', // purple (badge)
  '#4F8A5B', // green (online)
  '#B5473E', // red (destructive)
  '#4A7FA5', // blue
  '#C07850', // warm brown
];

function getAvatarColor(name: string): string {
  return AVATAR_COLORS[name.charCodeAt(0) % AVATAR_COLORS.length];
}
```

Avatar gradient: `linear-gradient(135deg, ${color}DD, ${color}99)`
Box shadow: `0 2px 8px ${color}44`

---

## Files in This Package

| File | Purpose |
|---|---|
| `Analog Design.html` | Interactive prototype — open in browser to view all 11 screens |
| `ios-frame.jsx` | iOS device frame component used in prototype |
| `tweaks-panel.jsx` | Tweaks panel component (not needed for implementation) |
| `README.md` | This document |

---

## Implementation Notes for Claude Code

When implementing, tell Claude Code:

> "I have a design handoff for my React Native app at `apps/mobile-ios/`. The design files are in the `handoff/` folder — open `README.md` for full specs and `Analog Design.html` in a browser to see the visual reference. Implement the designs screen by screen, following the existing file structure and using `StyleSheet.create` with the token values from `src/shared/ui/ios/theme.ts`. Start with the theme token updates, then work through auth screens, then main screens."
