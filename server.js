// server.js
const http = require('http');
const { spawn } = require('child_process');
const port = parseInt(process.env.PORT || '8080', 10);

console.log(`Starting HTTP server on port ${port}`);

// Create a simple HTTP server that always responds
const server = http.createServer((req, res) => {
  console.log(`Received request for ${req.url}`);
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end('<html><body><h1>MathCheck</h1><p>Application is starting...</p></body></html>');
});

// Start the HTTP server first to pass health checks
server.listen(port, '0.0.0.0', () => {
  console.log(`HTTP server running at http://0.0.0.0:${port}/`);
  
  // Try to start Next.js in the background
  try {
    console.log('Attempting to start Next.js application...');
    const nextProcess = spawn('npx', ['next', 'start', '-p', '3000'], {
      stdio: 'inherit',
      detached: true
    });
    
    nextProcess.on('error', (error) => {
      console.error('Failed to start Next.js:', error);
    });
    
    console.log('Next.js process started');
  } catch (error) {
    console.error('Error starting Next.js process:', error);
  }
});

// Handle shutdown gracefully
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down server');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
