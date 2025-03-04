/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  webpack(config) {
    // This is needed for PDF.js and other libraries
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    
    return config;
  }
}

module.exports = nextConfig
