/**
 * Minimal ESM loader for running TypeScript tests with Node --experimental-strip-types.
 * Remaps `.js` imports to `.ts` when the `.ts` file exists alongside the test.
 */
export function resolve(specifier, context, nextResolve) {
  if (specifier.endsWith('.js')) {
    const tsSpecifier = specifier.replace(/\.js$/, '.ts');
    try {
      return nextResolve(tsSpecifier, context);
    } catch {
      // fall through
    }
  }

  return nextResolve(specifier, context);
}
