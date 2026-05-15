import type { ReactNode } from 'react';

import { IosScreen } from './ios/IosScreen';

type ScreenPlaceholderProps = {
  title: string;
  body?: string;
  leftAction?: ReactNode;
  children?: ReactNode;
  rightAction?: ReactNode;
  headerMode?: 'large' | 'compact';
};

export function ScreenPlaceholder({ title, body, leftAction, children, rightAction, headerMode }: ScreenPlaceholderProps) {
  return (
    <IosScreen
      title={title}
      {...(body ? { subtitle: body } : {})}
      {...(leftAction ? { leftAction } : {})}
      {...(rightAction ? { rightAction } : {})}
      {...(headerMode ? { headerMode } : {})}
    >
      {children}
    </IosScreen>
  );
}
