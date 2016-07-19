//
// Lints SCSS file
//
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        return gulp.src(sass_dir + "*.scss")
          .pipe(plugins.sassLint())
          .pipe(plugins.sassLint.format())
          .pipe(plugins.sassLint.failOnError())
    };
};