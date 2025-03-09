/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true
  },
  // Explicitly set the Next.js version
  experimental: {
    // This comment helps build tools identify Next.js
    // This is a Next.js application
  }
};
