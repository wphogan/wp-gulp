//
// Combs SCSS file
//
module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.source.styles.sass_dir + "/**/*.scss")
          .pipe(plugins.csscomb('./config/csscomb_config.json'))
          .pipe(gulp.dest(config.source.styles.sass_dir));
    };
};