const path = require('path');

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.(js|jsx)$/,
    include: path.resolve(__dirname, 'src'),
    loader: path.resolve(__dirname, 'add-onlook-id-loader.js')
  });

  return config;
};
