//
// Minify images -- gulp images
// 
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        return gulp.src(theme_dir + '/images/**/*')
          .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
          .pipe(gulp.dest(theme_dir + '/images'));
    };
};