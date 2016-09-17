//
// Converts Sass files into SCSS files
//
module.exports = function (gulp, plugins, sass_dir, css_dir) {
    return function () {
        var vfs = require('vinyl-fs');
        var converter = require('sass-convert');
        return vfs.src(sass_dir + '*.scss')
          .pipe(converter({
            from: 'scss',
            to: 'sass',
          }))
          .pipe(plugins.rename('sass_style.' + 'sass'))
          .pipe(vfs.dest(sass_dir));
        };
};