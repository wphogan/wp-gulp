//
// Combs SCSS file
//
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        return gulp.src(sass_dir + "*.scss")
          .pipe(plugins.csscomb('./config/csscomb_config.json'))
          .pipe(gulp.dest(sass_dir));
    };
};