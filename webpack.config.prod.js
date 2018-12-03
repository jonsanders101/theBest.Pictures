import webpack from 'webpack';
import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import UglifyJsPlugin from 'uglifyjs-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';

export default {
  mode: 'production',
  devtool: 'cheap-eval-source-map',
  entry: path.resolve(__dirname, 'src/index'),
  target: 'web',
  output: {
    path: __dirname + '/dist', // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    noInfo: false
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({})
    ]
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({ debug: true }),
    new MiniCssExtractPlugin({ filename: 'style.css' }),
    new CompressionPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      minRatio: 0.8
    })
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.join(__dirname, 'src'),
        loaders: ['babel-loader']
      },
      {
        test: /(\.less)$/,
        loaders: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader']
      },
      {
        test: /\.(png|jpg)$/,
        loader: 'file-loader'
      }
    ]
  }
};
