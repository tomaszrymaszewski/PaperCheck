/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    // Enable modern JS features
    optimizeFonts: true,
    scrollRestoration: true,
  }
}

module.exports = nextConfig
