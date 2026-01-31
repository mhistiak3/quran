/**
 * Generates PWA icons (192x192 and 512x512) in public/.
 * Run: node scripts/generate-pwa-icons.js
 * Requires: npm install sharp --save-dev
 */
const fs = require("fs");
const path = require("path");

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.warn("Optional: install sharp (npm i -D sharp) and re-run to generate PWA icons.");
    process.exit(0);
    return;
  }

  const publicDir = path.join(__dirname, "..", "public");
  const green = { r: 21, g: 128, b: 61 }; // #15803d

  for (const size of [192, 512]) {
    const buffer = await sharp({
      create: {
        width: size,
        height: size,
        channels: 3,
        background: green,
      },
    })
      .png()
      .toBuffer();

    const out = path.join(publicDir, `icon-${size}x${size}.png`);
    fs.writeFileSync(out, buffer);
    console.log("Written", out);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
