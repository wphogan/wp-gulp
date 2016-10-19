//
// Lints SCSS file
//
module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.source.styles.sass_dir  + "/*.scss")
          .pipe(plugins.sassLint())
          .pipe(plugins.sassLint.format())
          .pipe(plugins.sassLint.failOnError())
    };
};