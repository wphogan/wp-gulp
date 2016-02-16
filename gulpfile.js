/*
Setup instuctions:
  In /themes folder run:
    mkdir wp-gulp && cd wp-gulp && npm init
    npm install --save-dev gulp gulp-load-plugins gulp-sass gulp-csscomb gulp-rename gulp-concat gulp-cache gulp-imagemin gulp-rename gulp-uglify gulp-load-plugins gulp-scss-lint gulp-notify gulp-sourcemaps gulp-autoprefixer gulp-minify-css gulp-livereload gulp-filesize gulp-plumber
    sublime gulpfile.js
*/

//theme, sass & css directories
var theme_dir   = '../themes/custom_template',
    sass_dir    = theme_dir + '/sass/sass/',
    css_dir     = theme_dir + '/sass/stylesheets';

// Include gulp
var gulp     = require('gulp');

// Include plugins
var plugins  = require('gulp-load-plugins')();

//Gulp default task, runs with 'gulp' -- gulp
gulp.task('default', ['watch']);

//error handling
var onError = function (err) {  
  console.log(err.toString())
  this.emit("error", new Error("Something happend: Error message!"))
  this.emit('end')
};
 function handleError (err) {  
  console.log(err.toString())
  this.emit('end')
};

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


var gzip_compression = '<IfModule mod_deflate.c>\n' +
   ' # Compress HTML, CSS, JavaScript, Text, XML and fonts\n' +
    'AddOutputFilterByType DEFLATE application/javascript\n' +
    'AddOutputFilterByType DEFLATE application/rss+xml\n' +
    'AddOutputFilterByType DEFLATE application/vnd.ms-fontobject\n' +
    'AddOutputFilterByType DEFLATE application/x-font\n' +
    'AddOutputFilterByType DEFLATE application/x-font-opentype\n' +
    'AddOutputFilterByType DEFLATE application/x-font-otf\n' +
    'AddOutputFilterByType DEFLATE application/x-font-truetype\n' +
    'AddOutputFilterByType DEFLATE application/x-font-ttf\n' +
    'AddOutputFilterByType DEFLATE application/x-javascript\n' +
    'AddOutputFilterByType DEFLATE application/xhtml+xml\n' +
    'AddOutputFilterByType DEFLATE application/xml\n' +
    'AddOutputFilterByType DEFLATE font/opentype\n' +
    'AddOutputFilterByType DEFLATE font/otf\n' +
    'AddOutputFilterByType DEFLATE font/ttf\n' +
    'AddOutputFilterByType DEFLATE image/svg+xml\n' +
    'AddOutputFilterByType DEFLATE image/x-icon\n' +
    'AddOutputFilterByType DEFLATE text/css\n' +
    'AddOutputFilterByType DEFLATE text/html\n' +
    'AddOutputFilterByType DEFLATE text/javascript\n' +
    'AddOutputFilterByType DEFLATE text/plain\n' +
    'AddOutputFilterByType DEFLATE text/xml\n\n' +
    
    '# Remove browser bugs (only needed for really old browsers)\n' +
    'BrowserMatch ^Mozilla/4 gzip-only-text/html\n' +
    'BrowserMatch ^Mozilla/4\.0[678] no-gzip\n' +
    'BrowserMatch \bMSIE !no-gzip !gzip-only-text/html\n' +
    'Header append Vary User-Agent\n' +
  '</IfModule>\n\n';


//
//Add gzip to htaccess
//
gulp.task('gzip', function () {
  return gulp.src('../../\.htaccess')
    .on('error', handleError)
    .pipe(plugins.contains(gzip_compression))
    .on('error', handleError)
    .pipe(plugins.insert.prepend(gzip_compression))
    .pipe(gulp.dest('../../'))
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
//Minify images -- gulp images
//
gulp.task('images', function() {
  return gulp.src(theme_dir + '/images/**/*')
    .pipe(plugins.cache(plugins.imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest(theme_dir + '/images'));
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

//production js -- minifies all non min js, concats into single file
gulp.task('jsp', ['js'], function() {
  return gulp.src(theme_dir + '/js/*min.js')
    .pipe(plugins.concat('mini2.js'))
    .pipe(gulp.dest(theme_dir + '/js_test'));
});

//
// Watch sass file(s) for changes -- gulp watch, run styles and images initially
//
gulp.task('watch', ['styles', 'images', 'gzip'], function() {
    plugins.livereload.listen()
    gulp.watch(sass_dir + "*.scss", ['styles'])
    // When there is a change, log a message in the console
    .on('change', function(event) {
      console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
});
