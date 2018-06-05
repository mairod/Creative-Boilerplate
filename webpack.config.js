const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const Config = require('./settings.config')

module.exports = {
    context: path.resolve(__dirname, './src'),
        entry: {
          app: ['./config/styles.js', './javascript/index.js'],
        },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'javascript/bundle.js',
        publicPath: '/',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './src'),
        host: Config.shared ? "0.0.0.0" : null,
        port: Config.port,
        inline: Config.inline,
        proxy: Config.proxy,
        https: Config.https
    },
    module: {
        rules: [
          {
              test: /\.js$/,
              exclude: [/node_modules/],
              use: [{
                  loader: 'babel-loader',
                  options: 
                  {
                      "presets": [
                          ["env", {
                              "targets": {
                                  "browsers": Config.browsersTarget
                              }
                          }]
                      ]
                  }
              }],
          },
          {
              test: /\.styl$/,
              use: ExtractTextPlugin
                .extract({
                    fallbackLoader: 'style-loader',
                    loader: [
                        { loader: 'css-loader', query: { modules: false, sourceMaps: Config.sourceMap } },
                        { loader: 'postcss-loader'},
                        { loader: 'stylus-loader'},
                    ]
                })
          },
          {
              test: /\.(txt|frag|vert|glsl|svg)$/,
              use: 'raw-loader'
          }
          // Loaders for other file types can go here
        ],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './index.html'
        }),
        new ExtractTextPlugin({
            filename: 'stylesheet/main.css',
            allChunks: true,
        }),
    ],
}
