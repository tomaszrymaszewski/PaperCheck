const withTM = require('next-transpile-modules')(['firebase', '@firebase']);

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    // Fix for Firebase auth issues with private class fields
    config.module.rules.push({
      test: /node_modules\/undici\/lib\/.*\.js$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', { targets: "defaults" }]
        ],
        plugins: [
          '@babel/plugin-proposal-private-methods',
          '@babel/plugin-proposal-class-properties'
        ]
      }
    });
    
    return config;
  },
}

module.exports = withTM(nextConfig);
