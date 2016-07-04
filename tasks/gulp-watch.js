//
// Watch sass file(s) for changes -- gulp watch, run styles and images initially
//
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        plugins.livereload.listen()
        gulp.watch(sass_dir + "*.scss", ['styles'])
        // When there is a change, log a message in the console
        .on('change', function(event) {
          console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
        });
    };
};