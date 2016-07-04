/*
Setup instuctions:
  In site root folder run: `cd wp-content/ && git clone https://github.com/wphogan/wp-gulp && cd wp-gulp && sublime gulpfile.js && npm install`
*/

// Theme, sass & css directories
var theme_dir   = '../themes/custom_template',
    sass_dir    = theme_dir + '/sass/sass/',
    css_dir     = theme_dir + '/sass/stylesheets';

// Include gulp
var gulp     = require('gulp');

// Include plugins
var plugins  = require('gulp-load-plugins')();

// Gulp default task, watches changes in SASS and compresses images -- runs with 'gulp'
gulp.task('default', ['watch']);

// Require Gulp Modules
var requireDir = require('require-dir');
requireDir('./tasks');







