import { useEffect, useState } from 'react';

import { getProfileByUsername } from '@features/profile/api/profile.api';
import type { ApiError } from '@shared/api/types';
import { t } from '@shared/i18n';

type UsernameAvailabilityState = {
  status: 'idle' | 'checking' | 'available' | 'taken' | 'error';
  ownerUserId: string | null;
  message: string | null;
};

const CHECK_DELAY_MS = 350;

export function useUsernameAvailability(username: string, currentUserId?: string | null) {
  const [state, setState] = useState<UsernameAvailabilityState>({
    status: 'idle',
    ownerUserId: null,
    message: null,
  });

  useEffect(() => {
    const normalizedUsername = username.trim().toLowerCase();

    if (normalizedUsername.length < 4 || !/^[a-z0-9_]+$/.test(normalizedUsername)) {
      setState({
        status: 'idle',
        ownerUserId: null,
        message: null,
      });
      return;
    }

    let isCancelled = false;
    const timer = setTimeout(() => {
      setState({
        status: 'checking',
        ownerUserId: null,
        message: t('profile.edit.username_checking'),
      });

      void getProfileByUsername(normalizedUsername)
        .then((profile) => {
          if (isCancelled) {
            return;
          }

          if (profile.id === currentUserId) {
            setState({
              status: 'available',
              ownerUserId: profile.id,
              message: t('profile.edit.username_current'),
            });
            return;
          }

          setState({
            status: 'taken',
            ownerUserId: profile.id,
            message: t('profile.edit.username_taken'),
          });
        })
        .catch((error: ApiError) => {
          if (isCancelled) {
            return;
          }

          const normalizedMessage = Array.isArray(error.message)
            ? error.message.join(', ').toLowerCase()
            : String(error.message ?? '').toLowerCase();

          if (error.code === 'NOT_FOUND' || normalizedMessage.includes('not found')) {
            setState({
              status: 'available',
              ownerUserId: null,
              message: t('profile.edit.username_available'),
            });
            return;
          }

          setState({
            status: 'error',
            ownerUserId: null,
            message: t('profile.edit.username_error'),
          });
        });
    }, CHECK_DELAY_MS);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
    };
  }, [username, currentUserId]);

  return state;
}
