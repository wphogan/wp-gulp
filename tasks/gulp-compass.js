//
// Compile SASS with Compass (only for older sites using Compass Libraries) 
// 
module.exports = function (gulp, plugins, config) {
    return function () {
        return  gulp.src(config.source.styles.sass_dir + '/**/*.scss')
          .pipe(plugins.plumber({
            errorHandler: function (error) {
              console.log(error.message);
              this.emit('end');
          }}))
          .pipe(plugins.compass({
            config_file: config.source.styles.sass_dir + 'config.rb',
            css: config.destination,
            sass: config.source.styles.sass_dir,
          }))
          .on('error', function(err) {
            // Would like to catch the error here 
          })
          .pipe(plugins.cleanCss())
          .pipe(gulp.dest(config.source.styles.sass_dir))
          .pipe(plugins.livereload())
          .resume();
    };
};