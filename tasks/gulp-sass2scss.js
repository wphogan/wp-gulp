//
// Converts Sass files into SCSS files
//
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        var vfs = require('vinyl-fs');
        var converter = require('sass-convert');
        return vfs.src(sass_dir + '*.sass')
          .pipe(converter({
            from: 'sass',
            to: 'scss',
          }))
          .pipe(plugins.rename('sass_style.' + 'scss'))
          .pipe(vfs.dest(sass_dir));
        };
};