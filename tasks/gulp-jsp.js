//
// production js -- minifies all non min js, concats into single file
//
gulp.task('jsp', ['js'], function() {
  return gulp.src(theme_dir + '/js/*min.js')
    .pipe(plugins.concat('mini2.js'))
    .pipe(gulp.dest(theme_dir + '/js_test'));
});