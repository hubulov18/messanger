import { SettingsNavigationRow } from './SettingsNavigationRow';

type SettingsValueRowProps = {
  title: string;
  subtitle?: string;
  value?: string | null;
  glyphText: string;
  glyphBackgroundColor: string;
  glyphTextColor: string;
};

export function SettingsValueRow(props: SettingsValueRowProps) {
  return <SettingsNavigationRow {...props} hideChevron />;
}
