import webpack from 'webpack'
import path from 'path'

export default {
  output: {
    filename: 'application.js',
    path: path.resolve(__dirname, '..', 'build')
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: { warnings: true }
    // })
  ]
}