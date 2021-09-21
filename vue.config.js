const path = require("path");

module.exports = {
  configureWebpack: {
    resolve: {
      symlinks: false,
      alias: {
        'vue$': path.resolve(__dirname, 'node_modules/vue')
      },
    }
  }
}


