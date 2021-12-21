const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // in the `entry` property there is no need to
  // specify `filename.js` at the end, its smart enough to figure out
  devtool: 'source-map',
  entry: ['./src/', './src/sass/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      // only allow `.js` or `.jsx` to be compiled
      {
        test: /\.jsx?/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.(s*)css$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'assets/css/[name].css',
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      { from: 'src/assets/images', to: 'assets/images' },
      { from: 'src/assets/fonts', to: 'assets/fonts' },
      { from: 'node_modules/govuk-frontend/govuk/all.js', to: 'javascript/all.js' },
      { from: 'node_modules/govuk-frontend/govuk/assets', to: 'assets' },
    ]),
    // This allows to pass env vars on runtime, see /nginx/run.sh and Dockerfile
    new webpack.EnvironmentPlugin({
      SGMR_DATA_API_BASE_URL: 'http://localhost:5000/v1',
      SGMR_MAINTENANCE: false,
    }),
    new HtmlWebpackPlugin({ template: './index.html' }),
  ],
  node: { fs: 'empty' },
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
