//
// Combs SCSS file
//
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        return gulp.src(sass_dir + "*.scss")
          .pipe(plugins.csscomb('./.css_comb_settings.json'))
          .pipe(gulp.dest(sass_dir));
    };
};