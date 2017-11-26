const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const isProduction = process.env['NODE_ENV'] === 'production';

const commonPlugins = [
  new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: '/static/vendor-[hash].js' }),
  new HtmlWebpackPlugin({ template: 'src/index.html' })
];
const plugins = (isProduction ? [
  new webpack.DefinePlugin({
    '__DEV__': !isProduction,
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      screw_ie8: true
    },
    comments: false,
    sourceMap: false,
    mangle: true,
    minimize: true
  }),
  new ExtractTextPlugin('/static/[name]-[hash].css')
] : [
  new webpack.DefinePlugin({
    '__DEV__': !isProduction
  })
]).concat(commonPlugins);

// const preLoaders = isProduction ? [
//   { test: /\.js$/, loader: 'source-map-loader' }
// ] : [];

module.exports = {
  entry: {
    app: './src/start.tsx',
    vendor: ['react', 'react-dom', 'redux', 'react-redux']
  },
  output: {
    filename: './static/app-[hash].js',
    path: __dirname + '/dist'
  },

  devtool: isProduction ? undefined : 'source-map',

  plugins,

  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
  },

  module: {
    loaders: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'ts-loader'.
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          'style-loader', {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('postcss-import')(),
                  require('postcss-cssnext')({
                          browsers: ['last 2 versions', 'ie >= 10', 'safari >= 8']
                        })
                ];
              }
            }
          }
        ]

      },
      {
        test: /\.(jpe?g|gif|png|svg)$/,
        loader: 'file-loader',
        query: {
          name: '/static/images/[name].[ext]'
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

  // postcss() {
  //   return [
  //     require('postcss-import'),
  //     require('postcss-cssnext')({
  //       browsers: ['last 2 versions', 'ie >= 10', 'safari >= 8']
  //     })
  //   ];
  // }
};
