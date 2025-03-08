/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Add this line to generate the standalone output
  output: 'standalone'
};

module.exports = nextConfig;
