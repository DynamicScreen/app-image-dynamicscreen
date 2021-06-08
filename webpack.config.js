const path = require('path');
const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  mode: "development",
  entry: {
    Image: path.resolve(__dirname, './src/Image.vue'),
    ImageOptions: path.resolve(__dirname, './src/ImageOptions.vue'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: "[name].js",
    library: ['DynamicScreenLibrary'],
    libraryTarget: "window",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/],
        }
      },
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue': '@vue/runtime-dom',
      '@': 'src',
    }
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  externals: {
    vue: 'Vue',
  },
}
