const http = require('http');
const fs = require('fs');
const path = require('path');

const START_PORT = 3000;
const MAX_PORT = 3010;
const DOCS = __dirname;
const PROJECT = path.resolve(__dirname, '..');
const NOJS_BUILD = path.join(PROJECT, '..', 'NoJS', 'dist', 'iife', 'no.js');
const ELEMENTS_BUILD = path.join(PROJECT, 'dist', 'iife', 'nojs-elements.js');

const CDN_PATTERN = /https:\/\/cdn\.no-js\.dev\//g;
const LOCAL_NOJS = '/__local__/no.js';
const LOCAL_ELEMENTS = '/__local__/nojs-elements.js';
const CDN_ELEMENTS_PATTERN = /https:\/\/cdn-elements\.no-js\.dev\//g;
const ELEMENTS_PATTERN = /\/dist\/iife\/nojs-elements\.js/g;

const MIME = {
  '.html': 'text/html',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.map':  'application/json',
};

const server = http.createServer((req, res) => {
  let url = req.url.split('?')[0];

  // ── Serve local NoJS core build ──
  if (url === LOCAL_NOJS) {
    console.log('  \u26A1 serving NoJS core \u2192 ../NoJS/dist/iife/no.js');
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    fs.createReadStream(NOJS_BUILD).pipe(res);
    return;
  }

  // ── Serve local Elements build ──
  if (url === LOCAL_ELEMENTS) {
    console.log('  \u26A1 serving Elements  \u2192 dist/iife/nojs-elements.js');
    res.writeHead(200, { 'Content-Type': 'application/javascript' });
    fs.createReadStream(ELEMENTS_BUILD).pipe(res);
    return;
  }

  // ── Resolve file path within docs/examples ──
  let filePath = path.join(DOCS, url);

  // Path traversal guard
  const resolved = path.resolve(filePath);
  if (!resolved.startsWith(DOCS)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  fs.stat(resolved, (err, stats) => {
    if (err) {
      // SPA fallback: extensionless paths → index.html
      if (!path.extname(url)) {
        serveFile(path.join(DOCS, 'index.html'), res);
        return;
      }
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    // Directory requests → index.html
    if (stats.isDirectory()) {
      filePath = path.join(resolved, 'index.html');
      fs.stat(filePath, (e2, s2) => {
        if (e2 || !s2.isFile()) { res.writeHead(404); res.end('Not Found'); return; }
        serveFile(filePath, res);
      });
      return;
    }

    if (!stats.isFile()) {
      res.writeHead(404);
      res.end('Not Found');
      return;
    }

    serveFile(resolved, res);
  });
});

function serveFile(filePath, res) {
  const ext = path.extname(filePath);

  // ── For HTML: rewrite CDN + dist paths → local builds on-the-fly ──
  if (ext === '.html') {
    fs.readFile(filePath, 'utf8', (err, html) => {
      if (err) { res.writeHead(500); res.end('Error'); return; }
      const rewritten = html
        .replace(CDN_PATTERN, LOCAL_NOJS)
        .replace(CDN_ELEMENTS_PATTERN, LOCAL_ELEMENTS)
        .replace(ELEMENTS_PATTERN, LOCAL_ELEMENTS);
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(rewritten);
    });
    return;
  }

  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
  fs.createReadStream(filePath).pipe(res);
}

function tryListen(port) {
  if (port > MAX_PORT) {
    console.error(`\n  \u2717 No available port in range ${START_PORT}\u2013${MAX_PORT}\n`);
    process.exit(1);
  }
  const net = require('net');
  const probe = net.createServer();
  probe.once('error', () => {
    console.log(`  \u23ED  Port ${port} in use, trying ${port + 1}...`);
    tryListen(port + 1);
  });
  probe.once('listening', () => {
    probe.close(() => {
      server.listen(port, () => {
        console.log(`\n  \uD83D\uDE80 NoJS-Elements Docs \u2014 http://localhost:${port}`);
        console.log(`  \u26A1 cdn.no-js.dev \u2192 local NoJS build (on-the-fly rewrite)`);
        console.log(`  \u26A1 cdn-elements.no-js.dev \u2192 local Elements build (on-the-fly rewrite)`);
        console.log(`  \uD83D\uDCC1 NoJS:     ${NOJS_BUILD}`);
        console.log(`  \uD83D\uDCC1 Elements: ${ELEMENTS_BUILD}\n`);
      });
    });
  });
  probe.listen(port);
}

tryListen(START_PORT);
