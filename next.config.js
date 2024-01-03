module.exports = {
  // reactStrictMode: true,
  // webpack5: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback, 
      net: false, 
      os: false, 
      child_process: false,
      "mock-aws-s3": false,
      "aws-sdk": false,
      nock: false,
      tls: false,
      dgram: false,
      dns: false,
      // timers: require.resolve('timers/promises'),
     };

    if (!isServer) {
      // config.node = {
      //   fs: 'empty'
      // };
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
