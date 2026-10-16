import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

const publicDir = path.resolve(process.cwd(), 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// 1. Write public/icon.svg
const iconSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#020617"/>
      <stop offset="50%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8"/>
      <stop offset="100%" stop-color="#2563eb"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect width="512" height="512" rx="96" fill="url(#bg)"/>
  <!-- Outer Tech Chip Border -->
  <rect x="80" y="80" width="352" height="352" rx="48" fill="none" stroke="url(#accent)" stroke-width="12" stroke-opacity="0.8"/>
  <!-- Pins -->
  <rect x="140" y="56" width="16" height="24" rx="4" fill="#38bdf8"/>
  <rect x="200" y="56" width="16" height="24" rx="4" fill="#38bdf8"/>
  <rect x="260" y="56" width="16" height="24" rx="4" fill="#38bdf8"/>
  <rect x="320" y="56" width="16" height="24" rx="4" fill="#38bdf8"/>
  <rect x="360" y="56" width="16" height="24" rx="4" fill="#38bdf8"/>
  
  <rect x="140" y="432" width="16" height="24" rx="4" fill="#38bdf8"/>
  <rect x="200" y="432" width="16" height="24" rx="4" fill="#38bdf8"/>
  <rect x="260" y="432" width="16" height="24" rx="4" fill="#38bdf8"/>
  <rect x="320" y="432" width="16" height="24" rx="4" fill="#38bdf8"/>
  <rect x="360" y="432" width="16" height="24" rx="4" fill="#38bdf8"/>
  
  <rect x="56" y="160" width="24" height="16" rx="4" fill="#38bdf8"/>
  <rect x="56" y="220" width="24" height="16" rx="4" fill="#38bdf8"/>
  <rect x="56" y="280" width="24" height="16" rx="4" fill="#38bdf8"/>
  <rect x="56" y="340" width="24" height="16" rx="4" fill="#38bdf8"/>
  
  <rect x="432" y="160" width="24" height="16" rx="4" fill="#38bdf8"/>
  <rect x="432" y="220" width="24" height="16" rx="4" fill="#38bdf8"/>
  <rect x="432" y="280" width="24" height="16" rx="4" fill="#38bdf8"/>
  <rect x="432" y="340" width="24" height="16" rx="4" fill="#38bdf8"/>

  <!-- Center Core -->
  <rect x="136" y="136" width="240" height="240" rx="32" fill="#0f172a" stroke="url(#gold)" stroke-width="6"/>
  <!-- Stylized Monogram I and T -->
  <path d="M 190 190 L 230 190 M 210 190 L 210 320 M 190 320 L 230 320" stroke="#38bdf8" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <path d="M 270 200 L 330 200 M 300 200 L 300 320" stroke="#fbbf24" stroke-width="20" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
  <!-- Circuit Wrench Dot -->
  <circle cx="256" cy="355" r="12" fill="#38bdf8"/>
</svg>`;

fs.writeFileSync(path.join(publicDir, 'icon.svg'), iconSvg);

// Minimal PNG generator for valid uncompressed PNG file format
function createSolidPng(width, height, r, g, b, a = 255) {
  const signature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr.writeUInt8(8, 8); // bit depth 8
  ihdr.writeUInt8(6, 9); // color type 6 (RGBA)
  ihdr.writeUInt8(0, 10); // compression method 0
  ihdr.writeUInt8(0, 11); // filter method 0
  ihdr.writeUInt8(0, 12); // interlace 0

  function makeChunk(type, data) {
    const chunkLength = data.length;
    const chunk = Buffer.alloc(8 + chunkLength + 4);
    chunk.writeUInt32BE(chunkLength, 0);
    chunk.write(type, 4, 4, 'ascii');
    data.copy(chunk, 8);

    // Compute CRC32
    let c = 0xffffffff;
    const table = new Uint32Array(256);
    for (let n = 0; n < 256; n++) {
      let v = n;
      for (let k = 0; k < 8; k++) {
        v = (v & 1) ? (0xedb88320 ^ (v >>> 1)) : (v >>> 1);
      }
      table[n] = v;
    }
    const typeAndData = chunk.subarray(4, 8 + chunkLength);
    for (let i = 0; i < typeAndData.length; i++) {
      c = table[(c ^ typeAndData[i]) & 0xff] ^ (c >>> 8);
    }
    c = (c ^ 0xffffffff) >>> 0;
    chunk.writeUInt32BE(c, 8 + chunkLength);
    return chunk;
  }

  const ihdrChunk = makeChunk('IHDR', ihdr);

  // Scanlines: row filter 0 followed by width * 4 RGBA pixels
  const rowSize = 1 + width * 4;
  const rawData = Buffer.alloc(height * rowSize);
  for (let y = 0; y < height; y++) {
    const offset = y * rowSize;
    rawData[offset] = 0; // Filter None
    for (let x = 0; x < width; x++) {
      const px = offset + 1 + x * 4;
      // Draw a subtle border or center square for visual identification
      const isBorder = x < 6 || x >= width - 6 || y < 6 || y >= height - 6;
      const isCenter = Math.abs(x - width / 2) < width / 5 && Math.abs(y - height / 2) < height / 5;
      if (isBorder) {
        rawData[px] = 56; // #38bdf8 (light blue)
        rawData[px + 1] = 189;
        rawData[px + 2] = 248;
        rawData[px + 3] = 255;
      } else if (isCenter) {
        rawData[px] = 37; // #2563eb (electric blue)
        rawData[px + 1] = 99;
        rawData[px + 2] = 235;
        rawData[px + 3] = 255;
      } else {
        rawData[px] = r;
        rawData[px + 1] = g;
        rawData[px + 2] = b;
        rawData[px + 3] = a;
      }
    }
  }

  const compressedData = zlib.deflateSync(rawData);
  const idatChunk = makeChunk('IDAT', compressedData);
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

// Generate PWA and iOS icons
// Slate 950 color: (2, 6, 23)
const png192 = createSolidPng(192, 192, 2, 6, 23);
const png512 = createSolidPng(512, 512, 2, 6, 23);
const pngApple = createSolidPng(180, 180, 2, 6, 23);
const pngMaskable = createSolidPng(512, 512, 15, 23, 42); // slate 900 with safe-zone margin

fs.writeFileSync(path.join(publicDir, 'pwa-192x192.png'), png192);
fs.writeFileSync(path.join(publicDir, 'pwa-512x512.png'), png512);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), pngApple);
fs.writeFileSync(path.join(publicDir, 'pwa-maskable-512x512.png'), pngMaskable);

console.log('PWA icons generated successfully in /public');
