require('dotenv').config();
const webpack = require('webpack');
const path = require('path');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env, argv) => {
  const devMode = argv.mode !== 'production';

  return {
    mode: devMode ? 'development' : 'production',
    entry: path.resolve(process.env.WEBPACK_ENTRY_POINT),
    output: {
      filename: 'main.js',
      path: path.resolve(process.env.WEBPACK_DIST_FOLDER),
    },
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            {
              loader: 'css-loader',
              options: {
                sourceMap: devMode ? true : false,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: devMode ? true : false,
              },
            },
          ],
        },
      ],
    },
    resolve: {
      fallback: {
        // fs: false,
        // util: require.resolve("util/"),
        path: require.resolve('os-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        buffer: require.resolve('buffer/'),
        // https: require.resolve("https-browserify"),
        // http: require.resolve("stream-http"),
        // os: require.resolve("os-browserify/browser"),
        // vm: require.resolve("vm-browserify"),
        stream: require.resolve('stream-browserify'),
        // constants: require.resolve("constants-browserify"),
        // assert: require.resolve("assert/"),
      },
    },
    plugins: [
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
      }),
      new webpack.SourceMapDevToolPlugin({}),
      new MiniCssExtractPlugin(),
    ],
  };
};
