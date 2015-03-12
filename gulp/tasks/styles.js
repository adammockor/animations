'use strict';

var gulp = require('gulp');
var rubySass = require('gulp-ruby-sass');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');

var config = require('./../config.js');
var reload = require('./browserSync.js').reload;
var handleError = require('./../utils/handleError.js');


// Compile scss using ruby sass

gulp.task('styles', function () {
  return rubySass(config.styles.src, config.styles.sassCfg)
    // Error emiting from sass not working right now
    // with plumber or without
    .pipe(plumber(handleError))
    //.on('error', handleError)
    .pipe(sourcemaps.write())
    .pipe(autoprefixer(config.styles.autoprefixerCfg))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(reload({stream:true, once:true}));
});
