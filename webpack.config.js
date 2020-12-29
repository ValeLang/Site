const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    roadmap: './app/roadmap/Roadmap.jsx',
  },

  // https://webpack.js.org/configuration/dev-server/
  devServer: {
    port: 8080
  },

  module: {
    rules: [
      { test: /\.css$/, loader: "style-loader!css-loader" },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        include: /app/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'url-loader',
        exclude: /app\/images/,
      },
      {
        test: /\.svg$/,
        loader: 'file-loader'
      },
      {
        test: /\.(svg|jpg|png)$/,
        include: /app\/images/,
        loader: 'file-loader'
      }
    ],
  },

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
  },

  // https://webpack.js.org/concepts/plugins/
  plugins: [
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['roadmap'], filename: 'roadmap', title: "Roadmap - Vale", inject: true }),
  ],

  optimization: {
    splitChunks: {
      chunks: 'all',
      name: 'everythingElse',
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        valeSiteComponents: {
          test: /[\\/]components[\\/]/,
          name: "valeSiteComponents"
        },
        nodeModules: {
          test: /[\\/]node_modules[\\/]/,
          name: "nodeModules"
        },
      },
    }
  }
};
