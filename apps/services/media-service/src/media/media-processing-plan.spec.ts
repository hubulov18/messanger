import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { buildMediaProcessingVariants } from './media-processing-plan.js';

describe('media processing plan', () => {
  it('builds a source variant for video', () => {
    assert.deepEqual(
      buildMediaProcessingVariants({
        mediaType: 'video',
        storageKey: 'user/video.mp4',
      }),
      [{ variantType: 'source', storageKey: 'user/video.mp4' }],
    );
  });

  it('builds thumbnail and source variants for image-like media', () => {
    assert.deepEqual(
      buildMediaProcessingVariants({
        mediaType: 'image',
        storageKey: 'user/image.jpg',
      }),
      [
        { variantType: 'thumbnail', storageKey: 'user/image.jpg' },
        { variantType: 'source', storageKey: 'user/image.jpg' },
      ],
    );
  });
});
