module.exports = {
  // reactStrictMode: true,
  future: {
    webpack5: true,
  },

  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.fallback = { 
      ...config.resolve.fallback, 
      fs: false,
      net: false, 
      os: false, 
      child_process: false,
      "mock-aws-s3": false,
      "aws-sdk": false,
      nock: false,
      tls: false,
      dgram: false,
      dns: false,
      timers: require.resolve('timers/promises'),
      path: false
     };

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
