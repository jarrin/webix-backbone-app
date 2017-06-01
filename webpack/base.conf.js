import path from 'path'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

export default {
  entry: './App.js',
  context: path.resolve(__dirname, '..', 'app'),
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'eslint-loader'
        }
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'less-loader']
        })
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader?sourceMap', 'sass-loader']
        })
      },
      {
        test: /\.css/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?sourceMap'
        })
      },
      {
        test: /\.(jpe?g|png|gif)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack-loader?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      { test: /\.woff(2)?(\?[a-z0-9=&.]+)?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?[a-z0-9=&.]+)?$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    alias: {
      setup: 'Setup/Production',
      underscore: 'lodash/lodash'
    },
    modules: [
      'node_modules',
      '.',
      'node_modules/webix',
      'App/Classes'
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
}
