var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');
var config = require('./gulp.config')();

var jsFiles = config.jsFiles;

gulp.task('jsstyle', function () {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs());
});

gulp.task('serve', ['jsstyle'], function () {
  var options = {
    script: config.script,
    delayTime: 1,
    env: {
      'PORT': 4000
    },
    watch: jsFiles
  };

  return nodemon(options)
    .on('restart', function (ev) {
      console.log('Restarting....');
    });
});
