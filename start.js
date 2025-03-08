// start.js
const { exec } = require('child_process');
const port = process.env.PORT || 8080;

console.log(`Starting Next.js app on port ${port}`);

// Start Next.js using the built-in start command with the specified port
exec(`npx next start -p ${port}`, { stdio: 'inherit' }, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error starting Next.js: ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
