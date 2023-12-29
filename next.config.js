/** @type {import('next').NextConfig} */
const nextConfig = {
  // reactStrictMode: true,
  webpack: config => {
    config.resolve.fallback = { ...config.resolve.fallback, net: false, os: false, fs: false };
    return config;
  },
  babel: {
    presets: ['next/babel'], // Configuração do preset do Next.js para o Babel
    // ... outras configurações do Babel, se necessário
  },
}

module.exports = nextConfig
