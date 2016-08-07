var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'static'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },
    {
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, '../js')
    },
    {
      test: /\.css$/,
      exclude: [/node_module/],
      loaders: ['style-loader', 'css-loader?sourceMap']
    }],
  },
  resolve: {
      alias: {
        'mappletooltip': path.join(__dirname, '../','js'),
        'react': path.resolve(path.join(__dirname, 'node_modules', 'react')),
        'mappleTypeList': path.resolve(path.join(__dirname, '../js/components/ToolTip/Plate/mappleTypeList.js')),
        'mappleTypeCSS': path.resolve(path.join(__dirname, '../js/components/ToolTip/Plate/mappleTypeCSS.js'))
      },
      extensions: ['', '.js', '.json']
    }
};
