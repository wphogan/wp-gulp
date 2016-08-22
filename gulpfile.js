 // Theme, Sass, & CSS directories
var theme_dir   = '../themes/' + 'mi_familia_vota',
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

// gulp comb 
gulp.task('lint', getTask('gulp-lint.js'));

// gulp scss2sass
gulp.task('scss2sass', getTask('gulp-scss2sass.js'));

// gulp sass2scss
gulp.task('sass2scss', getTask('gulp-sass2scss.js'));

// gulp clean
gulp.task('clean', ['comb','lint','images']);

// gulp
gulp.task('default', ['watch']);

// gulp watch
gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch(sass_dir + "**/*.+(scss|sass)", ['styles'])
  gulp.watch(sass_dir + "**/*.+(scss|sass)", ['styles'])
  .on('change', function(event) {
    console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
  });
  gulp.watch([theme_dir + '/**/*.php', theme_dir + '/**/*.js'], function (files){
    plugins.livereload.changed(files)
  });
});