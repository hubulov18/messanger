import test from 'node:test';
import assert from 'node:assert/strict';

import { toLastMessagePreview } from './message-summary-preview.js';

type PreviewInput = Parameters<typeof toLastMessagePreview>[0];

test('builds text message preview', () => {
  assert.equal(
    toLastMessagePreview({
      type: 'text' as PreviewInput['type'],
      text: ' hello ',
      deletedAt: null,
      attachmentCount: 0,
    }),
    'hello',
  );
});

test('builds attachment preview', () => {
  assert.equal(
    toLastMessagePreview({
      type: 'file' as PreviewInput['type'],
      text: null,
      deletedAt: null,
      attachmentCount: 2,
    }),
    '2 attachments',
  );
});
