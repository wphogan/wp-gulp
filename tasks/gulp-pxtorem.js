//
// Main function: Gulp PxToRem
// Convert pixels to rems 
//
module.exports = function (gulp, plugins, config) {
    return function () {
        var onError = require('./error.js').onError;
        return gulp.src(config.source.styles.sass_dir  + "/**/*.+(css)")
          .pipe(plugins.pxtorem())
          .pipe(gulp.dest(config.destination ))
          .resume();
    };
};