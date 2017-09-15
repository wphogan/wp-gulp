//
// Main function: Gulp Styles
// Compile SASS files, minify CSS, add sourcemap
//
module.exports = function (gulp, plugins, config) {
    return function () {
        var autoprefixer = require('autoprefixer');
        var onError = require('./error.js').onError;
        return gulp.src(config.source.styles.sass_dir  + "/**/*.+(scss|sass)")
          .pipe(plugins.sourcemaps.init())
          .pipe(plugins.sassGlob())
          .pipe(plugins.sass(function () {
            this.emit("error", new Error("Something happend: Sass crashed!"))}))
            .on("error", plugins.notify.onError({
              message: "Oh shit, error:\nLINE: <%= error.line %> \nFILE: <%= error.file %> ",
              title: "Even coding rock-stars make mistakes"
            }))
          .pipe(plugins.plumber({errorHandler: onError}))
          .pipe(plugins.postcss([ autoprefixer("last 3 version", "ie 7", "ie 8", "ie 9", "ie 10", "ie 11", "last 5 Safari versions") ]))
          .pipe(plugins.cleanCss())
          .pipe(plugins.sourcemaps.write('.')) // for external file add ('../maps')
          .pipe(gulp.dest(config.destination ))
          .resume();
    };
};