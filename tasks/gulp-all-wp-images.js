//
// Minify ALL wordpress uploaded images
//
module.exports = function (gulp, plugins) {
    return function () {
        return gulp.src([
            '../uploads/**/*'
        ],  {base: './source/'}) 
        .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('./public/assets/'));
    };
};