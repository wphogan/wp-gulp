//
// Minify images -- gulp images
// 
module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.source.styles.image_directory +'/**/*')
          .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
          .pipe(gulp.dest(theme_dir + '/images'));
    };
};