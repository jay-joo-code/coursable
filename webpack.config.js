const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MomentLocalesPlugin = require('moment-locales-webpack-plugin')

const outputDirectory = 'dist'

const plugins = [
  new Dotenv(),
  new CleanWebpackPlugin([outputDirectory]),
  new HtmlWebpackPlugin({
    template: './public/index.html',
    favicon: './public/favicon.ico',
    title: 'Coursable',
  }),
  new MiniCssExtractPlugin({
    filename: './css/[name].css',
    chunkFilename: './css/[id].css',
  }),
  new CopyPlugin([
    { from: './src/client/Assets', to: 'assets' },
  ]),
  new BundleAnalyzerPlugin({
    analyzerMode: 'static',
    openAnalyzer: false,
  }),
  new MomentLocalesPlugin(),
]

module.exports = {
  entry: ['babel-polyfill', './src/client/index.tsx'],
  output: {
    path: path.join(__dirname, outputDirectory),
    publicPath: '/',
    filename: './js/[name].bundle.js',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, 'src/client'),
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.tsx?$/,
        include: path.resolve(__dirname, 'src/client'),
        use: [
          {
            loader: 'awesome-typescript-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname, 'src/client'),
        loader: 'source-map-loader',
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.less$/,
        include: path.resolve(__dirname, 'src/client'),
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: './Less',
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              strictMath: true,
              noIeCompat: true,
            },
          },
        ],
      },
      {
        test: /\.(png|woff|woff2|eot|ttf)$/,
        include: path.resolve(__dirname, 'src/client'),
        loader: 'url-loader?limit=100000',
      },
      {
        test: /\.svg$/,
        include: path.resolve(__dirname, 'src/client'),
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [{ removeTitle: false }],
                floatPrecision: 2,
              },
              jsx: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['*', '.ts', '.tsx', '.js', '.jsx', '.json', '.less'],
    alias: {
      src: path.resolve(__dirname, 'src/client/'),
    },
  },
  devServer: {
    port: 3002,
    open: false,
    hot: true,
    historyApiFallback: true,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        react: { test: /[\\/]node_modules[\\/]((react).*)[\\/]/, name: 'react', chunks: 'all' },
        vendors: { test: /[\\/]node_modules[\\/]((?!react).*)[\\/]/, name: 'vendors', chunks: 'all' },
      },
    },
  },
  plugins,
}
