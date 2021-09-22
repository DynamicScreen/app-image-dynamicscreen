const path = require('path');
const webpack = require('webpack')
        const { VueLoaderPlugin } = require('vue-loader')

        module.exports = {
          mode: 'development',
          // devtool: 'inline-source-map',
          entry: {
            Image: path.resolve(__dirname, 'src/slide/Module.ts'),
            ImageOptions: path.resolve(__dirname, 'src/ImageOptions.vue'),
            // Module: path.resolve(__dirname, 'src/Module.ts'),
            // Image: path.resolve(__dirname, 'src/slide/'),

          },
          output: {
            path: path.resolve(__dirname, './dist'),
            publicPath: '/dist/',
            filename: '[name].js',
            library: ['dynamicscreen.image::0.2.0'],
            libraryTarget: 'window',
          },
          module: {
            rules: [
              {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
              },
              {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                options: {
                  appendTsSuffixTo: [/\.vue$/],
                },
                exclude: /node_modules/,
              },
              {
                test: /\.css$/,
                use: [
                  'style-loader',
                  'css-loader'
                ],
                exclude: /node_modules/,
              }
            ]
          },
          resolve: {
            fallback: { "fs": false },
            extensions: ['.ts', '.tsx', '.js', '.vue', '.json'],
            alias: {
              // 'vue$': resolve(__dirname, 'node_modules/vue'),
              // 'vue$': path.resolve(__dirname, 'node_modules/vue'),
              '@': 'src',
            }
          },
          plugins: [
            new VueLoaderPlugin(),
            new webpack.DefinePlugin({
              __VUE_OPTIONS_API__: false,
              __VUE_PROD_DEVTOOLS__: false,
            }),
          ],
          externals: {
            vue: "Vue",
          },
        }
