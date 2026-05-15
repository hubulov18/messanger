import { useEffect, useState } from 'react';

import { getMedia } from '@features/messages/api/media.api';

export function useAvatarPreviewUrl(avatarMediaId: string | null | undefined) {
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;

    if (!avatarMediaId) {
      setAvatarPreviewUrl(null);
      return;
    }

    void (async () => {
      try {
        const media = await getMedia(avatarMediaId);
        if (!isCancelled && media.processingStatus === 'ready') {
          setAvatarPreviewUrl(media.downloadUrl);
        }
      } catch {
        if (!isCancelled) {
          setAvatarPreviewUrl(null);
        }
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [avatarMediaId]);

  return avatarPreviewUrl;
}
