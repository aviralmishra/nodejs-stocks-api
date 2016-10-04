var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var stylish = require('gulp-jscs-stylish');

var nodemon = require('gulp-nodemon');

var config = require('./gulp.config')();

var jsFiles = config.jsFiles;
var testFiles = config.testFiles;
var allFiles = jsFiles.concat(testFiles);

gulp.task('jsstyle', function () {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs())
    .pipe(stylish({ verbose: true }));
});

gulp.task('tests', function () {
  return gulp.src(testFiles, { read: false })
    .pipe(mocha({
      reporter: 'spec',
      globals: {}
    }))
    .once('end', function () {
      process.exit();
    });
});

gulp.task('serve', ['jsstyle'], function () {
  var options = {
    script: config.script,
    delayTime: 1,
    env: {
      'PORT': 4000,
      'NODE_ENV': 'build'
    },
    watch: jsFiles
  };

  return nodemon(options)
    .on('restart', function (ev) {
      console.log('Restarting....');
    });
});

