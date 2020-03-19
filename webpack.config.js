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
      // Page common items
      config: path.resolve(__dirname, 'src/lib/config.js'),
      Banner: path.resolve(__dirname, 'src/components/Banner.jsx'),
      Footer: path.resolve(__dirname, 'src/components/Footer.jsx'),
      Header: path.resolve(__dirname, 'src/components/Header.jsx'),
      // Navigation & secure routes
      Auth: path.resolve(__dirname, 'src/lib/Auth.js'),
      Main: path.resolve(__dirname, 'src/components/Main.jsx'),
      Nav: path.resolve(__dirname, 'src/components/Nav.jsx'),
      ScrollToTop: path.resolve(__dirname, 'src/components/ScrollToTop.jsx'),
      SecureRoute: path.resolve(__dirname, 'src/lib/SecureRoute.jsx'),
      // User registration & signin/out
      SignIn: path.resolve(__dirname, 'src/components/Forms/SignIn.jsx'),
      SignOut: path.resolve(__dirname, 'src/components/SignOut.jsx'),
      UserInputCode: path.resolve(__dirname, 'src/components/Forms/UserInputCode.jsx'),
      UserRegister: path.resolve(__dirname, 'src/components/Forms/UserRegister.jsx'),
      UserResendCode: path.resolve(__dirname, 'src/components/Forms/UserResendCode.jsx'),
      // Page structures & common components
      PageContainer: path.resolve(__dirname, 'src/components/PageContainer.jsx'),
      PageIntro: path.resolve(__dirname, 'src/components/PageIntro.jsx'),
      PageIntroToForm: path.resolve(__dirname, 'src/components/PageIntroToForm.jsx'),
      SectionTabs: path.resolve(__dirname, 'src/components/SectionTabs.jsx'),
      SectionTable: path.resolve(__dirname, 'src/components/SectionTable.jsx'),
      StartButton: path.resolve(__dirname, 'src/components/StartButton.jsx'),
      Vessels: path.resolve(__dirname, 'src/components/Vessels.jsx'),
      // Page content
      contentArray: path.resolve(__dirname, 'src/components/contentArray.js'),
      PageAccount: path.resolve(__dirname, 'src/components/PageAccount.jsx'),
      // Forms
      CreatePerson: path.resolve(__dirname, 'src/components/Forms/CreatePerson.jsx'),
      CreateVessel: path.resolve(__dirname, 'src/components/Forms/CreateVessel.jsx'),
      EditAccount: path.resolve(__dirname, 'src/components/Forms/EditAccount.jsx'),
      FormPeople: path.resolve(__dirname, 'src/components/Forms/FormPeople.jsx'),
      FormVessels: path.resolve(__dirname, 'src/components/Forms/FormVessels.jsx'),
      FormVoyage: path.resolve(__dirname, 'src/components/Forms/FormVoyage.jsx'),
      FormVoyageArrival: path.resolve(__dirname, 'src/components/Forms/FormVoyageArrival.jsx'),
      FormVoyageCheckDetails: path.resolve(__dirname, 'src/components/Forms/FormVoyageCheckDetails.jsx'),
      FormVoyageDeparture: path.resolve(__dirname, 'src/components/Forms/FormVoyageDeparture.jsx'),
      FormVoyagePeople: path.resolve(__dirname, 'src/components/Forms/FormVoyagePeople.jsx'),
      FormVoyageResponsiblePerson: path.resolve(__dirname, 'src/components/Forms/FormVoyageResponsiblePerson.jsx'),
      FormVoyageSubmitted: path.resolve(__dirname, 'src/components/Forms/FormVoyageSubmitted.jsx'),
      FormVoyageVessel: path.resolve(__dirname, 'src/components/Forms/FormVoyageVessel.jsx'),
      State: path.resolve(__dirname, 'src/state'),
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
      { from: 'src/assets/images', to: 'assets/images' },
      { from: 'src/assets/fonts', to: 'assets/fonts' },
      { from: 'node_modules/govuk-frontend/govuk/all.js', to: 'javascript/all.js' },
      { from: 'node_modules/govuk-frontend/govuk/assets', to: 'assets' },
    ]),
    new webpack.DefinePlugin({
      'process.env': {
        SGMR_DATA_API_BASE_URL: JSON.stringify(process.env.SGMR_DATA_API_BASE_URL),
        ENVIRONMENT: JSON.stringify(process.env.ENVIRONMENT),
      },
    }),
  ],
  node: { fs: 'empty' },
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
