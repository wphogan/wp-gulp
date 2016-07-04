//
// Main function: Gulp Styles
// Compile SASS files, minify CSS, add sourcemap
//
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        return require('./error.js');
        return gulp.src(sass_dir + "*.scss")
          .pipe(plugins.plumber({
            errorHandler: function (err) {
              console.log(err);
              this.emit('end');
            }
          }))
          .pipe(plugins.sourcemaps.init())
          .pipe(plugins.sass(function () {
            this.emit("error", new Error("Something happend: Sass crashed!"))}))
            .on("error", plugins.notify.onError({
              message: "Oh shit: <%= error.message %>",
              title: "Even coding rock-stars make mistakes..."
            }))
          .pipe(plugins.plumber({errorHandler: onError}))
          .pipe(plugins.autoprefixer("last 3 version","safari 5", "ie 8", "ie 9", "ie 10", "ie 11")) //'Android >= 4','Chrome >= 20','Firefox >= 24', // Firefox 24 is the latest ESR
          .pipe(plugins.minifyCss())
          .pipe(plugins.sourcemaps.write()) // for external file add ('../maps')
          .pipe(gulp.dest(css_dir))
          .pipe(livereload())
          .resume();
    };
};