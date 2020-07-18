const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    home: './app/home/Home.jsx',
    roadmap: './app/roadmap/Roadmap.jsx',
    raiiNextSteps: './app/blog/RaiiNextSteps.jsx',
    refIntro: './app/reference/Intro.jsx',
    refStructs: './app/reference/Structs.jsx',
    refReferences: './app/reference/References.jsx',
    refInterfaces: './app/reference/Interfaces.jsx',
    refGenerics: './app/reference/Generics.jsx',
    refPatterns: './app/reference/Patterns.jsx',
    refRegions: './app/reference/Regions.jsx',
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
    new webpack.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['home'], filename: 'index.html', title: "Home - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['roadmap'], filename: 'roadmap', title: "Roadmap - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['raiiNextSteps'], filename: 'blog/next-steps-raii', title: "The Next Steps for Single Ownership and RAII", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['raiiNextSteps'], filename: 'blog/raii-next-steps', title: "The Next Steps for Single Ownership and RAII", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refIntro'], filename: 'ref/index.html', title: "Intro - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refIntro'], filename: 'ref/intro', title: "Intro - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refStructs'], filename: 'ref/structs', title: "Structs - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refReferences'], filename: 'ref/references', title: "References - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refInterfaces'], filename: 'ref/interfaces', title: "Interfaces - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refGenerics'], filename: 'ref/generics', title: "Generics - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refPatterns'], filename: 'ref/patterns', title: "Patterns - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refRegions'], filename: 'ref/regions', title: "Regions - Vale Reference", inject: true }),
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

/*

const path = require('path');

const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

var HTMLWebpackPlugin = require('html-webpack-plugin');
var HTMLWebpackPluginConfig = new HTMLWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

module.exports = {
  entry: {
    "index": __dirname + '/app/index.js',
    "another": __dirname + '/app/another.js',
  },
  mode: 'development',
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
  resolve: {
    extensions: ['.js', '.jsx']
  },
  output: {
    filename: '[name].js',
    path: __dirname + '/build'
  },
  plugins: [
    HTMLWebpackPluginConfig
  ],
  devServer: {
    historyApiFallback: true,
  }
};

module.exports.serve = {
  content: [__dirname],
  add: (app, middleware, options) => {
    const historyOptions = {
      index: '/index.html',
    };

    app.use(convert(history(historyOptions)));
  },
};

*/