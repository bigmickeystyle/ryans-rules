const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isProduction = process.env['NODE_ENV'] === 'production';

const commonPlugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: './static/vendor-[hash].js' }),
  new HtmlWebpackPlugin({ template: 'src/index.html' })
];

const plugins = (isProduction ? [
  new webpack.DefinePlugin({
    '__DEV__': !isProduction,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new ExtractTextPlugin('/static/[name]-[hash].css')
] : [
  new webpack.DefinePlugin({
    '__DEV__': !isProduction
  })
]).concat(commonPlugins);

module.exports = {
  entry: {
    app: './src/start.tsx',
    vendor: ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    filename: './static/app-[hash].js',
    path: __dirname + '/dist'
  },

  plugins,

  devtool: isProduction ? undefined : 'source-map',

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
              loader: "css-loader",
              options: {
                  modules: true, importLoaders: 1
              }
          },
          "postcss-loader"
        ]
      }, {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader',
        query: {
          name: './static/images/[name].[ext]'
        }
      }
    ],
  },

  devServer: {
    historyApiFallback: true,
    publicPath: '/',
    port: 8081,
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false
    }
  },
};
