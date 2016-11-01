//
// Custom gulpfile configuration
// This file is written using user inputs by install.js. Edit it as needed.
//

var theme_directory   = '../themes/' + 'align/';

module.exports = {
config: {
	source: {
		theme_dir: theme_directory,
		scripts: {
			js_dir: theme_directory + '/js/'
		},
		styles: {
			sass_dir: theme_directory + '/sass/sass/'
		},
		image_dir: theme_directory + '/images/'
		},
	destination: theme_directory + '/sass/stylesheets/'
	}
};