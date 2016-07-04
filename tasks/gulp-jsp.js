//
// Production js -- minifies all non min js, concats into single file
//
var gulp     = require('gulp'),
    plugins  = require('gulp-load-plugins')(); 
    
gulp.task('jsp', ['js'], function() {
  return gulp.src(theme_dir + '/js/*min.js')
    .pipe(plugins.concat('mini2.js'))
    .pipe(gulp.dest(theme_dir + '/js_test'));
});
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        return gulp.src(theme_dir + '/js/*min.js')
        .pipe(plugins.concat('mini2.js'))
        .pipe(gulp.dest(theme_dir + '/js_test'));
    };
};