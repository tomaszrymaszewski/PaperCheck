/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Remove the standalone output setting or set it correctly
  // output: 'standalone' 
};

module.exports = nextConfig;
