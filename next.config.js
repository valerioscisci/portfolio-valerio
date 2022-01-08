const { i18n } = require('./next-i18next.config');

module.exports = {
  i18n,
  target: 'serverless',
  images: {
    domains: ['localhost', 'www.thewandererdeveloper.com'],
  },
  webpack: function (config) {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    });
    return config;
  },
};
