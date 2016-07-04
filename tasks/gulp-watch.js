//
// Watch sass file(s) for changes -- gulp watch, run styles and images initially
//
gulp.task('watch', ['styles', 'images'], function() {
    plugins.livereload.listen()
    gulp.watch(sass_dir + "*.scss", ['styles'])
    // When there is a change, log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});