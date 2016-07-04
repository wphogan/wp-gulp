//
//Minify images -- gulp images
//
gulp.task('images', function() {
  return gulp.src(theme_dir + '/images/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(theme_dir + '/images'));
});
