'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const mocha = require('gulp-mocha');
const webpack = require('webpack-stream');
const sass = require('gulp-sass');
const maps = require('gulp-sourcemaps');
// const Server = require('karma').Server;

const scripts = ['index.js', 'lib/*.js', 'test/**/*.js', 'models/*.js',
  'routes/*.js', 'app/**/*.js?(x)', '!test/client/test_bundle.js'];
const clientScripts = ['app/**/*.js?(x)'];
const staticFiles = ['app/**/*.html'];
const clientTests = ['test/client/*.js', '!test/client/test_bundle.js'];

gulp.task('static:dev', () => {
  gulp.src(staticFiles, { 'base': 'app' })
    .pipe(gulp.dest('build/'));
});

gulp.task('sass:dev', () => {
  gulp.src('app/sass/application.sass')
    .pipe(maps.init())
    .pipe(sass({
      includePaths: require('node-bourbon').includePaths
        .concat(require('node-neat').includePaths)
    }).on('error', sass.logError))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('./build'));
});

gulp.task('build:dev', () => {
  gulp.src('app/index.js')
    .pipe(webpack({
      output: {
        filename: 'bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      },
      devtool: 'source-map'
    }))
    .pipe(gulp.dest('build/'));
});

gulp.task('build:test', () => {
  return gulp.src('test/client/test_entry.js')
    .pipe(webpack({
      output: {
        filename: 'test_bundle.js'
      },
      module: {
        loaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          }
        ]
      }
    }))
    .pipe(gulp.dest('test/client/'));
});

gulp.task('lint', () => {
  return gulp.src(scripts)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('test:server', () => {
  return gulp.src('test/server/*spec.js')
    .pipe(mocha());
});

// gulp.task('test:client', ['build:test'], (done) => {
//   new Server({
//     configFile: __dirname + '/karma.conf.js',
//     singleRun: true
//   }, done).start();
// });

// gulp.task('test', ['test:client']);

gulp.task('watch', () => {
  gulp.watch(scripts, ['lint']);
  gulp.watch(clientScripts, ['build:dev']);
  gulp.watch(staticFiles, ['static:dev']);
  // gulp.watch(clientTests, ['test:client']);
  gulp.watch('app/sass/*.sass', ['sass:dev']);
});

gulp.task('dev', ['lint', 'static:dev', 'build:dev', 'sass:dev']);

gulp.task('default', ['watch', 'dev']);
