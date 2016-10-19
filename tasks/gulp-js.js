//
// Concatenate & Minify non-min JS files
//
module.exports = function (gulp, plugins, config) {
    return function () {
       return gulp.src([config.source.scripts.js_dir + '/*.js', '!' + config.source.scripts.js_dir + '/*min.js'])
           .pipe(plugins.concat('main.js'))
           .pipe(plugins.rename({suffix: '.min'}))
           .pipe(plugins.uglify())
           .pipe(gulp.dest(config.source.scripts.js_dir ));
    };
};