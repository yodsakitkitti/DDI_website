import { existsSync, readFileSync } from 'node:fs';
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

test('uses opaque WCAG AA dashboard small-text colors', () => {
  const styles = readFileSync(resolve(process.cwd(), 'src/styles.css'), 'utf8');
  const smallText = styles.match(/--dashboard-small-text:\s*(#[0-9a-f]{6})/i)?.[1];
  const headerSmallText = styles.match(
    /--dashboard-header-small-text:\s*(#[0-9a-f]{6})/i,
  )?.[1];

  expect(smallText).toBeDefined();
  expect(headerSmallText).toBeDefined();
  expect(contrastRatio(smallText!, '#ffffff')).toBeGreaterThanOrEqual(4.5);
  expect(contrastRatio(headerSmallText!, '#d71920')).toBeGreaterThanOrEqual(4.5);
  expect(styles.match(/var\(--dashboard-small-text\)/g)?.length).toBeGreaterThanOrEqual(4);
  expect(styles.match(/var\(--dashboard-header-small-text\)/g)?.length).toBeGreaterThanOrEqual(2);
});
