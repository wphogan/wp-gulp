//
// Compile SASS with Compass (only for older sites using Compass Libraries) 
// 
module.exports = function (gulp, plugins, theme_dir, sass_dir) {
    return function () {
        return  gulp.src(theme_dir + '/sass/*.scss')
          .pipe(plugins.plumber({
            errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }}))
          .pipe(plugins.compass({
            config_file: theme_dir + '/sass/config.rb',
            css: css_dir,
            sass: sass_dir,
          }))
          .on('error', function(err) {
            // Would like to catch the error here 
          })
          .pipe(plugins.minifyCss())
          .pipe(gulp.dest(sass_dir))
          .pipe(plugins.livereload())
          .resume();
    };
};