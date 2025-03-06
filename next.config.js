/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['firebase', '@firebase'],
  webpack: (config) => {
    // Use 'mjs' fallback for node_modules
    config.resolve.extensionAlias = {
      '.js': ['.js', '.ts', '.tsx', '.jsx', '.mjs'],
    };
    return config;
  },
}

module.exports = nextConfig
