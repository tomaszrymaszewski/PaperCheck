// server.js
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const hostname = '0.0.0.0';  // Important for Cloud Run
const port = parseInt(process.env.PORT || '8080', 10);

console.log(`Starting Next.js app on ${hostname}:${port}`);

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer((req, res) => {
    // Handle requests
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, hostname, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
}).catch(err => {
  console.error('Error starting server:', err);
  process.exit(1);
});
