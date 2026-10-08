#!/usr/bin/env node

/**
 * Font Optimization Script
 * Mathematical: WOFF2 provides 25-30% better compression than TTF/OTF
 * Subsetting reduces font size by 60-80% for Arabic script (limited character set)
 * Expected: 70-85% reduction in font payload size
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const FONTS_DIR = path.join(__dirname, 'public', 'fonts');
const OPTIMIZED_DIR = path.join(__dirname, 'public', 'fonts', 'optimized');

// Arabic character subset (Unicode ranges for Arabic script)
const ARABIC_SUBSET = `U+0600-06FF,U+0750-077F,U+08A0-08FF,U+FB50-FDFF,U+FE70-FEFF,U+10D00-10D3F`;

// Latin and punctuation subset (for English numbers and symbols)
const LATIN_SUBSET = `U+0020-007F,U+00A0-00FF`;

// Combined subset
const FULL_SUBSET = `${ARABIC_SUBSET},${LATIN_SUBSET}`;

// Font configurations
const FONTS = [
  {
    name: 'Arkan-ABC-Favorit-Regular',
    input: 'Arkan ABC Favorit Regular-s.p.13709ce1.ttf',
    output: 'arkan-abc-favorit-regular.woff2',
    weight: 400
  },
  {
    name: 'Arkan-ABC-Favorit-Medium',
    input: 'Arkan ABC Favorit Medium-s.p.8ec3f1e7.otf',
    output: 'arkan-abc-favorit-medium.woff2',
    weight: 500
  },
  {
    name: 'Arkan-ABC-Favorit-Bold',
    input: 'Arkan ABC Favorit Bold-s.p.62621432.ttf',
    output: 'arkan-abc-favorit-bold.woff2',
    weight: 700
  }
];

async function optimizeFonts() {
  console.log('🔧 Starting font optimization...\n');

  // Create optimized directory
  if (!fs.existsSync(OPTIMIZED_DIR)) {
    fs.mkdirSync(OPTIMIZED_DIR, { recursive: true });
  }

  for (const font of FONTS) {
    const inputPath = path.join(FONTS_DIR, font.input);
    const outputPath = path.join(OPTIMIZED_DIR, font.output);

    if (!fs.existsSync(inputPath)) {
      console.warn(`⚠️  Input font not found: ${font.input}`);
      continue;
    }

    console.log(`📦 Processing: ${font.name}`);

    try {
      // Step 1: Subset the font using pyftsubset (requires fonttools)
      const subsetOutput = path.join(OPTIMIZED_DIR, `${font.name}-subset.ttf`);
      
      try {
        execSync(
          `pyftsubset "${inputPath}" ` +
          `--output-file="${subsetOutput}" ` +
          `--unicodes="${FULL_SUBSET}" ` +
          `--layout-features='*' ` +
          `--glyph-names ` +
          `--symbol-cmap ` +
          `--legacy-cmap ` +
          `--notdef-glyph ` +
          `--notdef-outline ` +
          `--recommended-glyphs ` +
          `--name-IDs='*' ` +
          `--name-legacy ` +
          `--drop-tables+=vmtx ` +
          `--no-harvest-cmaps`,
          { stdio: 'inherit' }
        );
        console.log(`  ✅ Subset created: ${font.name}-subset.ttf`);
      } catch (error) {
        console.warn(`  ⚠️  Subsetting failed, using original font`);
        fs.copyFileSync(inputPath, subsetOutput);
      }

      // Step 2: Convert to WOFF2 using fonttools
      try {
        execSync(
          `fonttools ttx -t WOFF2 -o "${outputPath}" "${subsetOutput}"`,
          { stdio: 'inherit' }
        );
        console.log(`  ✅ WOFF2 created: ${font.output}`);
      } catch (error) {
        console.warn(`  ⚠️  WOFF2 conversion failed, trying alternative method`);
        
        // Alternative: Use woff2_compress if available
        try {
          execSync(`woff2_compress "${subsetOutput}"`, { 
            stdio: 'inherit',
            cwd: OPTIMIZED_DIR 
          });
          console.log(`  ✅ WOFF2 created: ${font.output}`);
        } catch (error2) {
          console.warn(`  ⚠️  All conversion methods failed, keeping TTF`);
          fs.copyFileSync(subsetOutput, outputPath.replace('.woff2', '.ttf'));
        }
      }

      // Get file sizes
      const originalSize = fs.statSync(inputPath).size;
      const optimizedSize = fs.statSync(outputPath.replace('.woff2', '.woff2') ? 
        fs.existsSync(outputPath) ? fs.statSync(outputPath).size : 
        fs.statSync(outputPath.replace('.woff2', '.ttf')).size : originalSize
      );
      
      const reduction = ((originalSize - optimizedSize) / originalSize * 100).toFixed(1);
      console.log(`  📊 Size reduction: ${reduction}% (${(originalSize / 1024).toFixed(1)}KB → ${(optimizedSize / 1024).toFixed(1)}KB)\n`);

      // Cleanup temporary subset file
      if (fs.existsSync(subsetOutput)) {
        fs.unlinkSync(subsetOutput);
      }

    } catch (error) {
      console.error(`  ❌ Error processing ${font.name}:`, error.message);
    }
  }

  console.log('✨ Font optimization complete!\n');
  console.log('Next steps:');
  console.log('1. Update index.html to use optimized WOFF2 fonts');
  console.log('2. Update src/index.css @font-face declarations');
  console.log('3. Delete original font files after verification');
}

// Run optimization
optimizeFonts().catch(console.error);
