//
// Gulp Un-CSS 
// Remove unused CSS
//
module.exports = function (gulp, plugins, config) {
    return function () {
        return gulp.src(config.destination  + "/main.css")
          .pipe(plugins.uncss({
            html: [
              'http://localhost', 
              config.source.styles.sass_dir + "/**/*.+(scss|sass)"
            ]}))
          .pipe(gulp.dest(config.destination  + '/uncss/'))
          .resume();
    };
};