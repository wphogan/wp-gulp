//
// Main function: Gulp PxToRem
// Convert pixels to rems 
//
module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.destination  + "/**/*.+(css)")
          .pipe(plugins.pxtorem())
          .pipe(gulp.dest(config.destination ))
          .resume();
    };
};