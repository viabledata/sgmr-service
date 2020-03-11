const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  // in the `entry` property there is no need to
  // specify `filename.js` at the end, its smart enough to figure out
  entry: ['./src/', './src/sass/main.scss'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  resolve: {
    alias: {
      Banner: path.resolve(__dirname, 'src/components/Banner.jsx'),
      Footer: path.resolve(__dirname, 'src/components/Footer.jsx'),
      Header: path.resolve(__dirname, 'src/components/Header.jsx'),
      Nav: path.resolve(__dirname, 'src/components/Nav.jsx'),
      Main: path.resolve(__dirname, 'src/components/Main.jsx'),
      ScrollToTop: path.resolve(__dirname, 'src/components/ScrollToTop.jsx'),
      contentArray: path.resolve(__dirname, 'src/components/contentArray.js'),
      PageContainer: path.resolve(__dirname, 'src/components/PageContainer.jsx'),
      PageIntro: path.resolve(__dirname, 'src/components/PageIntro.jsx'),
      PageIntroToForm: path.resolve(__dirname, 'src/components/PageIntroToForm.jsx'),
      SectionTabs: path.resolve(__dirname, 'src/components/SectionTabs.jsx'),
      SectionTable: path.resolve(__dirname, 'src/components/SectionTable.jsx'),
      FormVessels: path.resolve(__dirname, 'src/components/Forms/FormVessels.jsx'),
      CreateVessel: path.resolve(__dirname, 'src/components/Forms/CreateVessel.jsx'),
      FormPeople: path.resolve(__dirname, 'src/components/Forms/FormPeople.jsx'),
      CreatePerson: path.resolve(__dirname, 'src/components/Forms/CreatePerson.jsx'),
      FormVoyage: path.resolve(__dirname, 'src/components/Forms/FormVoyage.jsx'),
      FormVoyageDeparture: path.resolve(__dirname, 'src/components/Forms/FormVoyageDeparture.jsx'),
      FormVoyageArrival: path.resolve(__dirname, 'src/components/Forms/FormVoyageArrival.jsx'),
      FormVoyageVessel: path.resolve(__dirname, 'src/components/Forms/FormVoyageVessel.jsx'),
      FormVoyagePeople: path.resolve(__dirname, 'src/components/Forms/FormVoyagePeople.jsx'),
      UserRegister: path.resolve(__dirname, 'src/components/Forms/UserRegister.jsx'),
      Auth: path.resolve(__dirname, 'src/lib/Auth.js'),
      SecureRoutes: path.resolve(__dirname, 'src/lib/SecureRoutes.jsx'),
    },
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
      { from: 'src/assets/javascript', to: 'javascript' },
      { from: 'src/assets/images', to: 'assets/images' },
      { from: 'src/assets/fonts', to: 'assets/fonts' },
      { from: 'node_modules/govuk-frontend/govuk/all.js', to: 'javascript/all.js' },
      { from: 'node_modules/govuk-frontend/govuk/assets', to: 'assets' },
    ]),
  ],
  node: { fs: 'empty' },
  watch: true,
  devServer: {
    // in order to use `<Router>`, historyApiFallback needs to be enabled
    historyApiFallback: true,
    hot: true,
    port: 8080,
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
};
