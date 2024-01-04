module.exports = {
  // reactStrictMode: true,
  future: {
    webpack5: true,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    if (!isServer) {
      config.module.rules.push({
        test: /\.html$/,
        use: 'html-loader'
      });
    }

    return config;
  },
  experimental: {
    forceSwcTransforms: true,
  },
};
