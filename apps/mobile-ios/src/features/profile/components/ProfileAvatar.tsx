import { useAvatarPreviewUrl } from '@features/profile/hooks/useAvatarPreviewUrl';
import { IosAvatar } from '@shared/ui/ios/IosAvatar';

type ProfileAvatarProps = {
  title: string;
  avatarMediaId?: string | null;
  color?: string;
  size?: number;
};

export function ProfileAvatar({ title, avatarMediaId = null, color, size }: ProfileAvatarProps) {
  const imageUrl = useAvatarPreviewUrl(avatarMediaId);
  return (
    <IosAvatar
      title={title}
      imageUrl={imageUrl}
      {...(color ? { color } : {})}
      {...(size ? { size } : {})}
    />
  );
}
