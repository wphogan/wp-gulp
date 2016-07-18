// Theme, Sass, & CSS directories
var theme_dir   = '../themes/mi_familia_vota',
    sass_dir    = theme_dir + '/sass/sass/',
    css_dir     = theme_dir + '/sass/stylesheets';

// Define Gulp and auto-plugin loader
var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')();

// Returns task.js file
function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, theme_dir, sass_dir, css_dir);
}

// Gulp tasks:

// gulp images
gulp.task('images', getTask('gulp-images.js'));

// gulp js
gulp.task('js', getTask('gulp-js.js'));

// gulp styles
gulp.task('styles', getTask('gulp-styles.js'));

// gulp comb 
gulp.task('comb', getTask('gulp-comb.js'));

// gulp scss2sass
gulp.task('scss2sass', getTask('gulp-scss2sass.js'));

// gulp sass2scss
gulp.task('sass2scss', getTask('gulp-sass2scss.js'));

// gulp
gulp.task('default', ['watch','images']);

// gulp watch
gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch(sass_dir + "*.+(scss|sass)", ['styles'], {
      //prevent infinite loop caused by csscomb
      ignoreInitial: true,
      //try this if loop happens
      //awaitWriteFinish: {
        //stabilityThreshold: 5000,
        //pollInterval: 400
      //},

  })
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch([theme_dir + '/*.php', theme_dir + '/*.js'], function (files){
    plugins.livereload.changed(files)
  });
});

// gulp sass
gulp.task('sass', ['styles','comb','images'], function() {
  plugins.livereload.listen()
  gulp.watch(sass_dir + "*.+(sass)", ['sass2scss', 'styles'])
  // When there is a change, log a message in the console
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
});