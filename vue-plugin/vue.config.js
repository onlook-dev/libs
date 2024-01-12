const { defineConfig } = require('@vue/cli-service')
const path = require('path');
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('add-data-onlook-id-loader')
        .loader(path.resolve(__dirname, 'add-data-onlook-id-loader.js'))
        .end();
  }
})
