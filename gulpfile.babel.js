import gulp from 'gulp'
import webpack from 'webpack'
import WebpackDevServer from 'webpack-dev-server'
import gutil from 'gutil'
import merge from 'webpack-merge'
import preProcess from 'gulp-preprocess'
import path from 'path'
import 'console.json'

import configBase from './webpack/base.conf'
import configDev from './webpack/dev.conf'
import configProd from './webpack/prod.conf'

let htmlFiles = [
  path.resolve(__dirname, 'app', '*.html')
]

gulp.task('default', ['watch'])

gulp.task('set-development', function (cb) {
  gutil.log('Going in Development mode. Will start Webpack dev server.')
  process.env.NODE_ENV = 'development'
  process.env.build_path = './development/'
  cb()
})
gulp.task('set-production', function (cb) {
  gutil.log('Going in Production mode. Will compile to ./build')
  process.env.NODE_ENV = 'production'
  process.env.build_path = './build/'
  cb()
})
gulp.task('watch', ['set-development', 'html'], function () {
  let config = merge(configBase, configDev)
  console.json(config)
  let webpackCompiler = webpack(config)
  let server = new WebpackDevServer(webpackCompiler, {
    contentBase: path.resolve(__dirname, 'development'),
    stats: {colors: true},
    hot: false

  })
  server.listen(8080, 'localhost', function () {
  })
  gulp.watch(htmlFiles, ['html'])
})

gulp.task('build', ['set-production', 'html'], function (callback) {
  let config = merge(configBase, configProd)
  console.json(config)
  webpack(config, function (err, stats) {
    if (err) throw new gutil.PluginError('webpack', err)
    gutil.log('[webpack]', stats.toString({
      // output options
    }))
    callback()
  })
})

gulp.task('html', function () {
  gulp.src(htmlFiles)
    .pipe(preProcess({context: {debug: process.env.NODE_ENV === 'development'}}))
    .pipe(gulp.dest(process.env.build_path))
})
