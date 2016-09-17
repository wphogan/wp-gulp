//
// Combs SCSS file
//
module.exports = function (gulp, plugins, sass_dir) {
    return function () {
        return gulp.src(sass_dir + "/*.scss")
          .pipe(plugins.csscomb('./config/csscomb_config.json'))
          .pipe(gulp.dest(sass_dir));
    };
};