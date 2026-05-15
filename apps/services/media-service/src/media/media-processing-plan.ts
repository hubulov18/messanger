export function buildMediaProcessingVariants(params: {
  mediaType: 'image' | 'video' | 'audio' | 'file' | 'avatar';
  storageKey: string;
}) {
  switch (params.mediaType) {
    case 'video':
      return [
        {
          variantType: 'source',
          storageKey: params.storageKey,
        },
      ];
    case 'image':
    case 'avatar':
      return [
        {
          variantType: 'thumbnail',
          storageKey: params.storageKey,
        },
        {
          variantType: 'source',
          storageKey: params.storageKey,
        },
      ];
    default:
      return [
        {
          variantType: 'source',
          storageKey: params.storageKey,
        },
      ];
  }
}
