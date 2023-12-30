/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false, fs: false };
    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
  // module: {
  //   rules: [
  //     {
  //       test: /\.html$/,
  //       use: 'html-loader'
  //     }
     
  //   ]
  // }
}

module.exports = nextConfig
