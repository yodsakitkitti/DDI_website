import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

test('includes all hero image assets', () => {
  for (const assetPath of [
    'public/images/university-logo.png',
    'public/images/ddi-logo.png',
    'public/images/ddi-sandbox-hero.png',
  ]) {
    expect(existsSync(resolve(process.cwd(), assetPath))).toBe(true);
  }
});
