/**
 * Image Optimization Utility for Make My Interior
 * Usage:
 *   npm install -D sharp
 *   node scripts/optimize-images.mjs ./raw-photos ./public/media/projects
 */

import fs from 'node:fs';
import path from 'node:path';

async function main() {
  const [, , inputDir = './raw-photos', outputDir = './public/media/projects'] = process.argv;

  let sharp;
  try {
    ({ default: sharp } = await import('sharp'));
  } catch {
    console.error('Please install sharp first: npm install -D sharp');
    process.exit(1);
  }

  if (!fs.existsSync(inputDir)) {
    console.error(`Input directory not found: ${inputDir}`);
    process.exit(1);
  }

  fs.mkdirSync(outputDir, { recursive: true });
  const files = fs.readdirSync(inputDir).filter((f) => /\.(jpe?g|png|webp)$/i.test(f));

  for (const file of files) {
    const srcPath = path.join(inputDir, file);
    const baseName = path.basename(file, path.extname(file)).toLowerCase().replace(/[^a-z0-9-]+/g, '-');
    const destJpg = path.join(outputDir, `${baseName}.jpg`);
    const destWebp = path.join(outputDir, `${baseName}.webp`);

    await sharp(srcPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(destJpg);

    await sharp(srcPath)
      .resize({ width: 1600, withoutEnlargement: true })
      .webp({ quality: 80 })
      .toFile(destWebp);

    console.log(`Optimized: ${baseName}.jpg & ${baseName}.webp`);
  }
}

main();
