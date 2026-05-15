/**
 * Minimal ESM loader for running TypeScript tests with Node --experimental-strip-types.
 * Remaps `.js` imports to `.ts` when the `.ts` file exists alongside the test.
 */
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export function resolve(specifier, context, nextResolve) {
  // Only remap local .js imports to .ts when the .ts file exists
  if (specifier.endsWith('.js')) {
    const tsSpecifier = specifier.replace(/\.js$/, '.ts');
    try {
      const result = nextResolve(tsSpecifier, context);
      return result;
    } catch {
      // fall through to original
    }
  }
  return nextResolve(specifier, context);
}
