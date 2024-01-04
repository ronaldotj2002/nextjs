module.exports = {
  // reactStrictMode: true,
  future: {
    webpack5: true,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Verifica se está no ambiente de desenvolvimento e não é um servidor
    if (dev && !isServer) {
      config.node = {
        fs: 'empty', // Evita erros de 'fs' durante o desenvolvimento
      };
    }

    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};
