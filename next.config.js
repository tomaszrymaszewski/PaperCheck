/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Set the correct port for production
  serverRuntimeConfig: {
    PORT: process.env.PORT || 3000
  }
};

module.exports = nextConfig;
