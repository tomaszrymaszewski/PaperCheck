// server.js
// This file is needed to start the standalone server

// Find the correct path to the standalone server
let serverPath;
try {
  // When running in Cloud Run
  serverPath = './.next/standalone/server.js';
  require(serverPath);
  console.log('Started standalone server from', serverPath);
} catch (error) {
  try {
    // Alternative path when running in some environments
    serverPath = '/workspace/.next/standalone/server.js';
    require(serverPath);
    console.log('Started standalone server from', serverPath);
  } catch (innerError) {
    console.error('Failed to find standalone server.js:', error);
    console.error('Also tried alternative path:', innerError);
    
    // Fall back to a simple HTTP server
    const http = require('http');
    const port = parseInt(process.env.PORT || '8080', 10);
    
    console.log(`Starting minimal HTTP server on port ${port}`);
    
    const server = http.createServer((req, res) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1>MathCheck</h1><p>Server is starting up...</p></body></html>');
    });
    
    server.listen(port, '0.0.0.0', () => {
      console.log(`Fallback server running at http://0.0.0.0:${port}/`);
    });
  }
}
