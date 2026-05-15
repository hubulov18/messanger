import { Avatar } from '@telegram/ui';

import { telegramLayout } from './theme';

type IosAvatarProps = {
  title: string;
  color?: string;
  size?: number;
  imageUrl?: string | null;
};

/**
 * App-level avatar wrapper.
 *
 * Delegates to @telegram/ui's Avatar primitive, which provides:
 *   - stable hue derived from the name (replaces the hardcoded accent color)
 *   - image loading with graceful fallback to initials
 *   - theme-aware styling
 *
 * The `color` prop is accepted for API compatibility but ignored — the
 * package's name-based hue gives each user a unique, deterministic color
 * which is a better UX than a single accent for everyone.
 */
export function IosAvatar({ title, size = telegramLayout.avatar, imageUrl = null }: IosAvatarProps) {
  return (
    <Avatar
      name={title}
      shape="circle"
      pixelSize={size}
      {...(imageUrl ? { imageUrl } : {})}
    />
  );
}
