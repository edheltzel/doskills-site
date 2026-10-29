// Serves dist and checks the landing install box at a 390px viewport.
// The command stays on one line and scrolls. The Copy button does not move.

import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright-core';

const root = path.resolve('dist');
const chrome = process.env.CHROME_PATH || '/usr/bin/google-chrome';

function serve(dir) {
  return http.createServer((req, res) => {
    const url = decodeURIComponent((req.url || '/').split('?')[0]);
    let file = path.join(dir, url);
    if (url.endsWith('/')) file = path.join(file, 'index.html');
    else if (!path.extname(file)) {
      if (fs.existsSync(file + '.html')) file += '.html';
      else if (fs.existsSync(path.join(file, 'index.html'))) file = path.join(file, 'index.html');
    }
    fs.readFile(file, (err, data) => {
      if (err) {
        res.statusCode = 404;
        res.end('not found');
        return;
      }
      const types = {
        '.html': 'text/html; charset=utf-8',
        '.css': 'text/css',
        '.js': 'text/javascript',
        '.svg': 'image/svg+xml',
        '.woff2': 'font/woff2',
        '.xml': 'application/xml',
      };
      res.setHeader('content-type', types[path.extname(file)] || 'application/octet-stream');
      res.end(data);
    });
  });
}

if (!fs.existsSync(path.join(root, 'index.html'))) {
  console.error('dist/index.html is missing. Run npm run build first.');
  process.exit(1);
}

const server = serve(root);
await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await chromium.launch({
  executablePath: chrome,
  args: ['--no-sandbox', '--disable-dev-shm-usage'],
});

let failed = false;
const lines = [];
const context = await browser.newContext({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 1,
});
const page = await context.newPage();
await page.goto(base + '/', { waitUntil: 'load' });
await page.evaluate(() => document.fonts.ready);

const measured = await page.evaluate(() => {
  const text = document.querySelector('.cmd .t');
  const scroll = document.querySelector('.cmd-scroll');
  const button = document.querySelector('.cmd .cp');
  if (!text || !scroll || !button) return { missing: true };
  const lineHeight = parseFloat(getComputedStyle(text).lineHeight);
  const before = button.getBoundingClientRect();
  const beforeBox = { x: before.x, y: before.y, width: before.width, height: before.height };
  scroll.scrollLeft = scroll.scrollWidth;
  const after = button.getBoundingClientRect();
  return {
    missing: false,
    height: text.getBoundingClientRect().height,
    lineHeight,
    scrollWidth: scroll.scrollWidth,
    clientWidth: scroll.clientWidth,
    before: beforeBox,
    after: { x: after.x, y: after.y, width: after.width, height: after.height },
    docWidth: document.documentElement.scrollWidth,
  };
});

if (measured.missing) {
  failed = true;
  lines.push('FAIL install box elements missing');
} else {
  const oneLine = Math.abs(measured.height - measured.lineHeight) < 0.5;
  const scrolls = measured.scrollWidth > measured.clientWidth;
  const still = ['x', 'y', 'width', 'height'].every(
    (key) => Math.abs(measured.before[key] - measured.after[key]) < 0.5,
  );
  const fits = measured.docWidth <= 390;
  if (!oneLine || !scrolls || !still || !fits) failed = true;
  lines.push(
    `${oneLine ? 'ok  ' : 'FAIL'} command height ${measured.height.toFixed(2)} line ${measured.lineHeight.toFixed(2)}`,
  );
  lines.push(
    `${scrolls ? 'ok  ' : 'FAIL'} scroll ${measured.scrollWidth} > ${measured.clientWidth}`,
  );
  lines.push(
    `${still ? 'ok  ' : 'FAIL'} copy x ${measured.before.x.toFixed(2)} -> ${measured.after.x.toFixed(2)}`,
  );
  lines.push(`${fits ? 'ok  ' : 'FAIL'} document scrollWidth ${measured.docWidth}`);
}

await browser.close();
server.close();
console.log(lines.join('\n'));
console.log(failed ? 'FAIL' : 'PASS');
if (failed) process.exit(1);
