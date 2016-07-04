/*
Setup instuctions:
  In site root folder run: `cd wp-content/ && git clone https://github.com/wphogan/wp-gulp && cd wp-gulp && sublime gulpfile.js && npm install`
*/

//theme, sass & css directories
var theme_dir   = '../themes/custom_template',
    sass_dir    = theme_dir + '/sass/sass/',
    css_dir     = theme_dir + '/sass/stylesheets';

// Include gulp
var gulp     = require('gulp');

// Include plugins
var plugins  = require('gulp-load-plugins')();

//Gulp default task, watches changes in SASS and compresses images -- runs with 'gulp'
gulp.task('default', ['watch']);

//error handling
var onError = function (err) {  
  console.log(err.toString())
  this.emit("error", new Error("Something happened: Error message!"))
  this.emit('end')
};
 function handleError (err) {  
  console.log(err.toString())
  this.emit('end')
};

//main function: compile SASS files, minify CSS, add sourcemap
gulp.task('styles', function () {
  return gulp.src(sass_dir + "*.scss")
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(plugins.sourcemaps.init())
    .pipe(plugins.sass(function () {
      this.emit("error", new Error("Something happend: Sass crashed!"))}))
      .on("error", plugins.notify.onError({
        message: "Oh shit: <%= error.message %>",
        title: "Even coding rock-stars make mistakes..."
      }))
    .pipe(plugins.plumber({errorHandler: onError}))
    .pipe(plugins.autoprefixer("last 3 version","safari 5", "ie 8", "ie 9", "ie 10", "ie 11")) //'Android >= 4','Chrome >= 20','Firefox >= 24', // Firefox 24 is the latest ESR
    .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write()) // for external file add ('../maps')
    .pipe(gulp.dest(css_dir))
    .pipe(plugins.livereload())
    .resume();
});

//production styles -- no sourcemap! , compress images
gulp.task('production', ['images'], function () {
  return gulp.src(sass_dir + "*.scss")
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(plugins.sass(function () {
      this.emit("error", new Error("Something happend: Sass crashed!"))}))
      .on("error", plugins.notify.onError({
        message: "Oh shit: <%= error.message %>",
        title: "Even coding rock-stars make mistakes..."
      }))
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.error('Oh no! SASS has crashed! Error in: \n', err.message);
        this.emit('end');
      }
    }))
    .pipe(plugins.autoprefixer("last 3 version","safari 5", "ie 8", "ie 9", "ie 10", "ie 11")) //'Android >= 4','Chrome >= 20','Firefox >= 24', // Firefox 24 is the latest ESR
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(css_dir))
    .pipe(plugins.livereload())
    .resume();
});

//
//Minify images -- gulp images
//
gulp.task('images', function() {
  return gulp.src(theme_dir + '/images/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(theme_dir + '/images'));
});

//minify ALL wordpress uploaded images
gulp.task('all-images',function(){
  return gulp.src([
      '../uploads/**/*'
  ],  {base: './source/'}) 
  .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
  .pipe(gulp.dest('./public/assets/'));
});


//
// Concatenate & Minify non-min JS files
//
gulp.task('js', function() {
  return gulp.src([theme_dir + '/js/*.js', '!' + theme_dir + '/js/*min.js'])
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(theme_dir + '/js'));
});

//
// production js -- minifies all non min js, concats into single file
//
gulp.task('jsp', ['js'], function() {
  return gulp.src(theme_dir + '/js/*min.js')
    .pipe(plugins.concat('mini2.js'))
    .pipe(gulp.dest(theme_dir + '/js_test'));
});

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
