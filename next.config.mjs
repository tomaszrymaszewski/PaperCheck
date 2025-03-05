/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // If you're having issues with CSS not loading, try uncommenting this:
  // webpack: (config) => {
  //   config.module.rules.push({
  //     test: /\.css$/,
  //     use: ["style-loader", "css-loader", "postcss-loader"],
  //   });
  //   return config;
  // },
};

export default nextConfig;
