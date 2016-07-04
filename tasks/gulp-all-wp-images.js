//
// Minify ALL wordpress uploaded images
//
var gulp         = require('gulp');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var minify       = require('gulp-minify-css');
var autoprefixer = require('autoprefixer');
var contains     = require('contains');
var concat       = require('concat');
var csscomb      = require('csscomb');
var imagemin     = require('imagemin');
var insert       = require('insert');
var livereload   = require('livereload');
var minify-css   = require('minify-css');
var notify       = require('notify');
var plumber      = require('plumber');
var rename       = require('rename');
var sass         = require('sass');
var sourcemaps   = require('sourcemaps');
var cache        = require('cache'); 
var uglify       = require('uglify');

gulp.task('all-wp-images',function(){
  return gulp.src([
      '../uploads/**/*'
  ],  {base: './source/'}) 
  .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest('./public/assets/'));
});
