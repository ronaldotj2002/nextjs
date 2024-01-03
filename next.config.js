module.exports = {
  // reactStrictMode: true,
  webpack5: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = { ...config.resolve.fallback, fs: false };

    // if (!isServer) {
    //   config.module.rules.push({
    //     test: /\.html$/,
    //     use: 'html-loader'
    //   });
    // }

    return config;
  },
  // experimental: {
  //   forceSwcTransforms: true,
  // },
};
