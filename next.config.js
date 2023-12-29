/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false, fs: false };
    return config;
  },
}

module.exports = nextConfig
