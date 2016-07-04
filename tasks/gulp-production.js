//production styles -- no sourcemap! , compress images
gulp.task('production', ['images'], function () {
  return gulp.src(sass_dir + "*.scss")
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(plugins.sass(function () {
      this.emit("error", new Error("Something happend: Sass crashed!"))}))
      .on("error", plugins.notify.onError({
        message: "Oh shit: <%= error.message %>",
        title: "Even coding rock-stars make mistakes..."
      }))
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.error('Oh no! SASS has crashed! Error in: \n', err.message);
        this.emit('end');
      }
    }))
    .pipe(plugins.autoprefixer("last 3 version","safari 5", "ie 8", "ie 9", "ie 10", "ie 11")) //'Android >= 4','Chrome >= 20','Firefox >= 24', // Firefox 24 is the latest ESR
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(css_dir))
    .pipe(plugins.livereload())
    .resume();
});