import type { ReactNode } from 'react';

import { IosSection } from '@shared/ui/ios/IosSection';

type SettingsSectionProps = {
  title?: string;
  children?: ReactNode;
};

export function SettingsSection({ title, children }: SettingsSectionProps) {
  return <IosSection {...(title ? { title } : {})}>{children}</IosSection>;
}
