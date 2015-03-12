'use strict';

var gulp = require('gulp');
var jade = require('gulp-jade');
var data = require('gulp-data');
var plumber  = require('gulp-plumber');
var fs = require('fs');
var extend = require('gulp-extend');

var config = require('./../config.js');
var reload = require('./browserSync.js').reload;
var handleError = require('./../utils/handleError.js');

// Compile jade to html

gulp.task('jade', ['jade:prepareData'], function() {
  return gulp.src(config.jade.src)
    .pipe(plumber(handleError))
    .pipe(data(function() {
      return JSON.parse(fs.readFileSync(config.jadeData.dataPath));
    }))
    .pipe(jade(config.jade.cfg))
    .pipe(gulp.dest(config.jade.dest))
    .pipe(reload({stream:true, once:true}));
});

// Concat *.json file to single data.json

gulp.task('jade:prepareData', function() {
  return gulp.src(config.jadeData.src)
  .pipe(extend(config.jadeData.dataName))
  .pipe(gulp.dest(config.jadeData.dest));
});