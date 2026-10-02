import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { projects } from './content/siteContent';

test('includes all hero image assets', () => {
  for (const assetPath of [
    'public/images/university-logo.png',
    'public/images/ddi-logo.png',
    'public/images/ddi-sandbox-hero.png',
  ]) {
    expect(existsSync(resolve(process.cwd(), assetPath))).toBe(true);
  }
});

test('includes every venture logo and supplied team image', () => {
  for (const project of projects) {
    const assetPaths = [project.logoSrc];
    if ('teamImageSrc' in project && typeof project.teamImageSrc === 'string') {
      assetPaths.push(project.teamImageSrc);
    }

    for (const assetPath of assetPaths) {
      expect(assetPath, `${project.name} needs a local image path`).toMatch(/^\/images\//);
      expect(
        existsSync(resolve(process.cwd(), 'public', assetPath.slice(1))),
        `${project.name} asset is missing: ${assetPath}`,
      ).toBe(true);
    }
  }
});

const relativeLuminance = (hex: string) => {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((channel) => Number.parseInt(channel, 16) / 255)
    .map((channel) =>
      channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4,
    );

  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722;
};

const contrastRatio = (foreground: string, background: string) => {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
};

test('uses WCAG AA text contrast for the paper theme', () => {
  const styles = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
  const ink = styles.match(/--ink:\s*(#[0-9a-f]{6})/i)?.[1];
  const paper = styles.match(/--paper:\s*(#[0-9a-f]{6})/i)?.[1];
  const muted = styles.match(/--muted:\s*(#[0-9a-f]{6})/i)?.[1];

  expect(ink).toBeDefined();
  expect(paper).toBeDefined();
  expect(muted).toBeDefined();
  expect(contrastRatio(ink!, paper!)).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(muted!, paper!)).toBeGreaterThanOrEqual(4.5);
});
