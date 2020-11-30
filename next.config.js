module.exports = {
  webpack: config => {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: require.resolve("graphql-tag/loader")
    });
    return config;
  },
  webpackDevMiddleware: config => {
    return config;
  },
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200],
    imageSizes: [32, 48, 64, 96, 128]
  }
};
