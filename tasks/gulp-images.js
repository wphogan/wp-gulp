//
// Minify images -- gulp images
// 
module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.source.image_dir +'/**/*')
          .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
          .pipe(gulp.dest(config.source.image_dir));
    };
};