import path from 'path'
import webpack from 'webpack'
export default {
  output: {
    filename: 'application.debug.js',
    path: undefined
  },
  devtool: 'source-map',
  resolve: {
    alias: {
      webix: 'webix/webix_debug',
      setup: 'Setup/Development'

    }
  },
  devServer: {
    public: 'localhost:8080'
  }
}
