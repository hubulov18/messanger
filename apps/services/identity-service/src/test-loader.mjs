export function resolve(specifier, context, nextResolve) {
  const fromSource = typeof context.parentURL === 'string' && context.parentURL.includes('/src/');
  if (fromSource && (specifier.startsWith('./') || specifier.startsWith('../')) && specifier.endsWith('.js')) {
    try {
      return nextResolve(specifier.replace(/\.js$/, '.ts'), context);
    } catch {
      // fall through
    }
  }

  return nextResolve(specifier, context);
}
