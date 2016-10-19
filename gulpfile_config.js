//
// Default gulpfile configuration
//
var theme_directory   = '../themes/' + 'custom_template/';


//
// Set JavaScript, Sass, Images, and Css directories
// Defaults:
// -javascript: theme_name/js/
// -sass: theme_name/sass/sass/
// -images: theme_name/images/
// -css destination: theme_name/sass/stylessheets/

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
    
    destination: theme_directory + '/sass/stylesheets/',
  }

};