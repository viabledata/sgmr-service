const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: ['./src/', './src/assets/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      '/assets': path.resolve(__dirname, 'node_modules/govuk-frontend/govuk/assets'),
      config: path.resolve(__dirname, 'src/lib/config.js'),
    },
    extensions: ['.js', '.jsx'],
    fallback: {
      fs: false,
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/inline',
      },
    ],
  },
  plugins: [
    new CopyPlugin(
      {
        patterns: [
          { from: 'src/assets/images', to: 'assets/images' },
          { from: 'node_modules/govuk-frontend/govuk/all.js', to: 'javascript/all.js' },
          { from: 'node_modules/govuk-frontend/govuk/assets', to: 'assets' },
        ],
      },
    ),
    // This allows to pass env vars on runtime, see /nginx/run.sh and Dockerfile
    new webpack.EnvironmentPlugin({
      SGMR_DATA_API_BASE_URL: 'https://sgmr-data-api.dev.sgmr.cop.homeoffice.gov.uk',
      SGMR_MAINTENANCE: false,
    }),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
  devServer: {
    // in order to use `<Router>`, historyApiFallback needs to be enabled
    historyApiFallback: true,
    hot: true,
    port: 8080,
    proxy: {
      '/api': 'http://0.0.0.0:5000',
    },
  },
};
