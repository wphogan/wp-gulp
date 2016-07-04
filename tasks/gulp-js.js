//
// Concatenate & Minify non-min JS files
//
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
       return gulp.src([theme_dir + '/js/*.js', '!' + theme_dir + '/js/*min.js'])
           .pipe(plugins.concat('main.js'))
           .pipe(plugins.rename({suffix: '.min'}))
           .pipe(plugins.uglify())
           .pipe(gulp.dest(theme_dir + '/js'));
    };
};