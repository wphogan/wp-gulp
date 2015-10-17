/*
Reminder: get sass beutify for sublime!, trailing spaces, align
Setup instuctions:
  In /themes folder run:
    mkdir wp-gulp && cd wp-gulp && npm init
    npm install --save-dev gulp gulp-load-plugins gulp-sass gulp-csscomb gulp-rename gulp-concat gulp-cache gulp-imagemin gulp-rename gulp-uglify gulp-load-plugins gulp-scss-lint gulp-notify gulp-sourcemaps gulp-autoprefixer gulp-minify-css gulp-livereload gulp-filesize gulp-plumber
    sublime gulpfile.js
*/

//theme, sass & css directories
var theme_dir   = '../twentyfifteen',
    sass_dir    = theme_dir + '/stylesheets/sass/',
    css_dir     = theme_dir + '/stylesheets/css';

// Include gulp
var gulp     = require('gulp');

// Include plugins
var plugins  = require('gulp-load-plugins')();

//Gulp default task, runs with 'gulp' -- gulp
gulp.task('default', ['watch']);

//main function: compile SASS files, minify CSS -- gulp styles
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
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.error('Oh no! SASS has crashed! Error in: \n', err.message);
        this.emit('end');
      }
    }))
    .pipe(plugins.autoprefixer("last 3 version","safari 5", "ie 8", "ie 9", "ie 10")) //'Android >= 4','Chrome >= 20','Firefox >= 24', // Firefox 24 is the latest ESR
    .pipe(plugins.minifyCss())
    .pipe(plugins.sourcemaps.write()) // for external file add ('../maps')
    .pipe(gulp.dest(css_dir))
    .pipe(plugins.filesize())
    .pipe(plugins.livereload())
    .resume();
});

//
//CSScomb the SASS file function -- gulp comb
//
gulp.task('comb',  function() {
  return gulp.src(sass_dir + "*.scss")
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(plugins.csscomb())
    .pipe(gulp.dest(sass_dir));
});

//
//Lint the SASS file function -- gulp lint
//
gulp.task('lint',  function() {
  return gulp.src(sass_dir + "*.scss")
    .pipe(plugins.plumber({
      errorHandler: function (err) {
        console.log(err);
        this.emit('end');
      }
    }))
    .pipe(plugins.scsslint());
});


//
//Minify images -- gulp images
//
gulp.task('images', function() {
  return gulp.src(theme_dir + '/images/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(theme_dir + '/images_test'));
});

//
// Concatenate & Minify JS -- gulp js
//
gulp.task('js', function() {
  return gulp.src(theme_dir + '/js/*.js')
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.rename({suffix: '.min'}))
    .pipe(plugins.uglify())
    .pipe(gulp.dest(theme_dir + '/js_test'));
});

//
// Watch sass file(s) for changes -- gulp watch
//
gulp.task('watch', ['styles'], function() {
    plugins.livereload.listen()
    gulp.watch(sass_dir + "*.scss", ['styles'])
    // When there is a change, log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});