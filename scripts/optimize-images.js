import sharp from 'sharp';
import { readdir, stat, rename } from 'node:fs/promises';
import { join, parse } from 'node:path';

const PORTFOLIO_DIR = 'public/images/portfolio';
const WIDTHS = [400, 800, 1200];
const QUALITY = 80;

async function optimizeImages() {
  const files = await readdir(PORTFOLIO_DIR);
  const jpgs = files.filter(
    (f) => f.endsWith('.jpg') && !f.includes('-w') && !f.endsWith('.webp')
  );

  console.log(`Found ${jpgs.length} source images to optimize.`);
  let skipped = 0;
  let processed = 0;

  for (const file of jpgs) {
    const { name } = parse(file);
    const srcPath = join(PORTFOLIO_DIR, file);

    // Check if already optimized (all variants exist)
    const webpFull = join(PORTFOLIO_DIR, `${name}.webp`);
    try {
      await stat(webpFull);
      // If the full-size WebP exists, assume all variants do
      skipped++;
      continue;
    } catch {
      // Needs processing
    }

    // Read source into buffer once to avoid file locking issues on Windows
    const srcBuffer = await sharp(srcPath).toBuffer({ resolveWithObject: true });
    const srcWidth = srcBuffer.info.width || 1920;

    // Full-size WebP
    await sharp(srcBuffer.data).webp({ quality: QUALITY }).toFile(webpFull);

    // Compressed full-size JPG (write to temp, then rename over original)
    const tmpPath = join(PORTFOLIO_DIR, `${name}.tmp.jpg`);
    await sharp(srcBuffer.data).jpeg({ quality: QUALITY }).toFile(tmpPath);
    await rename(tmpPath, srcPath);

    // Responsive variants
    for (const w of WIDTHS) {
      if (w >= srcWidth) continue;
      await sharp(srcBuffer.data)
        .resize(w)
        .jpeg({ quality: QUALITY })
        .toFile(join(PORTFOLIO_DIR, `${name}-w${w}.jpg`));
      await sharp(srcBuffer.data)
        .resize(w)
        .webp({ quality: QUALITY })
        .toFile(join(PORTFOLIO_DIR, `${name}-w${w}.webp`));
    }

    processed++;
    if (processed % 10 === 0) {
      console.log(`  Processed ${processed}/${jpgs.length - skipped}...`);
    }
  }

  console.log(
    `Done. Processed: ${processed}, Skipped (already optimized): ${skipped}`
  );
}

optimizeImages().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});
