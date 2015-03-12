'use strict';

var gulp = require('gulp');

var config = require('./../config.js');
var reload = require('./browserSync.js').reload;

// Watch source files

gulp.task('watch', function () {
  gulp.watch(config.watch.styles, ['styles']);
  gulp.watch(config.watch.jade, ['jade']);
  gulp.watch(config.watch.wiredep, ['wiredep', reload]);
  gulp.watch(config.watch.jshnit, ['jshint', reload]);
});
