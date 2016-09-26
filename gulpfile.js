//
// Configuration
//

var theme_directory   = '../themes/' + 'custom_template/';

// Theme, Sass, & CSS directories// configuration
var config = {
	source: {
		scripts: {
			js_directory: theme_directory + '/js/'
		},
		styles: {
			sass_directory: theme_directory + '/sass/sass/'
		},
		image_directory: theme_directory + '/images/'
	},
	destination: theme_directory + '/sass/stylesheets/'
};


// Define Gulp and auto-plugin loader
var gulp        = require('gulp'),
    plugins     = require('gulp-load-plugins')();

// Returns task.js file
function getTask(task) {
    return require('./tasks/' + task)(gulp, plugins, config);
}



//
// Gulp tasks:
//

// gulp images
gulp.task('images', getTask('gulp-images.js'));

// gulp js
gulp.task('js', getTask('gulp-js.js'));

// gulp styles
gulp.task('styles', getTask('gulp-styles.js'));

// gulp comb -- configure settings in /config/sass_lint_config.yml
gulp.task('comb', getTask('gulp-comb.js'));

// gulp lint -- configure settings in /config/sass_lint_config.yml
gulp.task('lint', getTask('gulp-lint.js'));

// gulp compass -- for sites using compass libraries
gulp.task('compass', getTask('gulp-compass.js'));

// gulp clean
gulp.task('clean', ['comb','lint','images']);

// gulp
gulp.task('default', ['watch']);

// gulp scss2sass
//gulp.task('scss2sass', getTask('gulp-scss2sass.js'));

// gulp sass2scss
//gulp.task('sass2scss', getTask('gulp-sass2scss.js'));

// gulp watch
gulp.task('watch', function() {
  plugins.livereload.listen();
  gulp.watch(config.source.styles.sass_directory + "/**/*.+(scss|sass)", ['styles']);
  gulp.watch([theme_dir + '/**/*.php', theme_dir + '/**/*.js', theme_dir + '/**/*.css'], function (files){
    plugins.livereload.changed(files)
  });
});