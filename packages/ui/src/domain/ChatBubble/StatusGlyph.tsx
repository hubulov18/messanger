import { memo } from 'react';
import { Text } from '../../primitives/Text';
import type { MessageStatus } from '../../types';

/**
 * Tiny status glyph rendered in the bubble footer for self-messages.
 *
 *   sending   — hollow ring
 *   sent      — single check
 *   delivered — double check
 *   read      — double check (bright on self-bubble, accent otherwise)
 *   failed    — exclamation in danger color
 *
 * Unicode glyphs — no icon font dependency.
 */

export interface StatusGlyphProps {
  readonly status: MessageStatus;
  /** True when rendered inside a self (outgoing) bubble — text sits on accent. */
  readonly onAccent: boolean;
}

type TextColor = 'textOnAccent' | 'textOnAccentSecondary' | 'textSecondary' | 'accent' | 'danger';

function glyphFor(status: MessageStatus): string {
  switch (status) {
    case 'sending':
      return '◯';
    case 'sent':
      return '✓';
    case 'delivered':
    case 'read':
      return '✓✓';
    case 'failed':
      return '!';
  }
}

function colorFor(status: MessageStatus, onAccent: boolean): TextColor {
  if (status === 'failed') return 'danger';
  if (onAccent) return 'textOnAccentSecondary';
  if (status === 'read') return 'accent';
  return 'textSecondary';
}

function StatusGlyphComponent({ status, onAccent }: StatusGlyphProps) {
  return (
    <Text role="caption" color={colorFor(status, onAccent)}>
      {glyphFor(status)}
    </Text>
  );
}

export const StatusGlyph = memo(StatusGlyphComponent);
