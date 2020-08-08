const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {

  // https://webpack.js.org/concepts/entry-points/#multi-page-application
  entry: {
    home: './app/home/Home.jsx',
    roadmap: './app/roadmap/Roadmap.jsx',
    contribute: './app/contribute/Contribute.jsx',

    raiiNextSteps: './app/blog/RaiiNextSteps.jsx',
    zeroCostRefs: './app/blog/ZeroCostRefs.jsx',
    crossPlatformCore: './app/blog/CrossPlatformCore.jsx',

    refIntro: './app/reference/Intro.jsx',
    refStructs: './app/reference/Structs.jsx',
    refReferences: './app/reference/References.jsx',
    refInterfaces: './app/reference/Interfaces.jsx',
    refGenerics: './app/reference/Generics.jsx',
    refPatterns: './app/reference/Patterns.jsx',
    refRegions: './app/reference/Regions.jsx',

    superstructuresIntro: './app/superstructures/Intro.jsx',
    superstructuresComparing: './app/superstructures/Comparing.jsx',
    superstructuresConstraints: './app/superstructures/Constraints.jsx',
    superstructuresEffects: './app/superstructures/Effects.jsx',
    superstructuresFunctions: './app/superstructures/Functions.jsx',
    superstructuresModifying: './app/superstructures/Modifying.jsx',
    superstructuresReferences: './app/superstructures/References.jsx',
    superstructuresReverting: './app/superstructures/Reverting.jsx',
    superstructuresSnapshots: './app/superstructures/Snapshots.jsx',
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
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['home'], filename: 'index.html', title: "Home - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['roadmap'], filename: 'roadmap', title: "Roadmap - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['contribute'], filename: 'contribute', title: "Contribute - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['raiiNextSteps'], filename: 'blog/next-steps-raii', title: "The Next Steps for Single Ownership and RAII - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['raiiNextSteps'], filename: 'blog/raii-next-steps', title: "The Next Steps for Single Ownership and RAII - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['zeroCostRefs'], filename: 'blog/zero-cost-refs-regions', title: "Zero Cost References with Regions - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['crossPlatformCore'], filename: 'blog/cross-platform-core-vision', title: "Vision for the Cross-Platform Core - Vale", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refIntro'], filename: 'ref/index.html', title: "Intro - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refIntro'], filename: 'ref/intro', title: "Intro - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refStructs'], filename: 'ref/structs', title: "Structs - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refReferences'], filename: 'ref/references', title: "References - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refInterfaces'], filename: 'ref/interfaces', title: "Interfaces - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refGenerics'], filename: 'ref/generics', title: "Generics - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refPatterns'], filename: 'ref/patterns', title: "Patterns - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['refRegions'], filename: 'ref/regions', title: "Regions - Vale Reference", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresIntro'], filename: 'superstructures/intro', title: "Intro - Vale Superstructures", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresComparing'], filename: 'superstructures/comparing', title: "Comparing - Vale Superstructures", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresConstraints'], filename: 'superstructures/constraints', title: "Constraints - Vale Superstructures", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresEffects'], filename: 'superstructures/effects', title: "Effects - Vale Superstructures", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresFunctions'], filename: 'superstructures/functions', title: "Functions - Vale Superstructures", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresModifying'], filename: 'superstructures/modifying', title: "Modifying - Vale Superstructures", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresReferences'], filename: 'superstructures/references', title: "References - Vale Superstructures", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresReverting'], filename: 'superstructures/reverting', title: "Reverting - Vale Superstructures", inject: true }),
    new HtmlWebpackPlugin({template: './app/main.html', chunks: ['superstructuresSnapshots'], filename: 'superstructures/snapshots', title: "Snapshots - Vale Superstructures", inject: true }),
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