export function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith('.js')) {
    try {
      return nextResolve(specifier.replace(/\.js$/, '.ts'), context);
    } catch {
      // fall through
    }
  }

  return nextResolve(specifier, context);
}
