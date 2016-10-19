#!/usr/bin/env node

var prompt  = require('prompt');
var fs      = require('fs');


//
// Set Theme, JavaScript, Sass, Images, and Css directories
//
// Defaults:
// -javascript: theme_name/js/
// -sass: theme_name/sass/sass/
// -images: theme_name/images/
// -css destination: theme_name/sass/stylessheets/
//
var theme_directory   = '../themes/' + 'custom_template/';

var default_config = {
  config: {
    source: {
      theme_dir: "theme_directory",
      scripts: {
        js_dir: "theme_directory + '/js/'"
      },
      styles: {
        sass_dir: "theme_directory + '/sass/sass/'"
      },
      image_dir: "theme_directory + '/images/'"
    },
    destination: "theme_directory + '/sass/stylesheets/'",
  }
};

//
// get user config
//
var properties = [
  {
    name: 'theme_name',
    message: 'Theme Name (defaults to "custom_template")',
    validator: /^[a-zA-Z\s\-]+$/,
    warning: 'Theme name must be only letters, spaces, or dashes'
  }
  // {
  //   name: 'javascript_directory',
  //   message: 'JavaScript Directory (defaults to "/js")'
  // },
  // {
  //   name: 'sass_directory',
  //   message: 'Sass directory (defaults to "/sass/sass")'
  // },
  // {
  //   name: 'image_directory',
  //   message: 'Image directory (defaults to "/images")'
  // },
  // {
  //   name: 'css_directory',
  //   message: 'Css directory (defaults to "/sass/stylesheets")'
  // }
];

//
// get user's responses
//
prompt.start();

prompt.get(properties, function (err, result) {
  if (err) { return onErr(err); }
  console.log('New Gulpfile Configuration:');
  console.log('  Theme name: ' + result.theme_name);
  // console.log('  JavaScript directory: ' + result.javascript_directory);
  // console.log('  Sass directory: ' + result.sass_directory);
  // console.log('  Image directory: ' + result.image_directory);
  // console.log('  CSS directory: ' + result.css_directory);

  //write new config file
  write_new_config_file(result);
  
});

function onErr(err) {
  console.log(err);
  return 1;
}

//define write file
var wstream = fs.createWriteStream('./gulpfile_config.js');

// write file function
var write_new_config_file = function(properties) {
  console.log('Writing new gulfile congifuation...');

  wstream.write("//\n// Custom gulpfile configuration\n// This file is written using user inputs by install.js. Edit it as needed.\n//\n\n");

  //set theme name variable
  if (properties.theme_name) {
    wstream.write("var theme_directory   = '../themes/' + '" + properties.theme_name +"/';");
  } else {
    wstream.write("var theme_directory   = '" + theme_directory + "';");
  }
  wstream.write("\n\nmodule.exports = {\nconfig: {\n\tsource: {\n\t\ttheme_dir: theme_directory,\n\t\tscripts: {\n\t\t\tjs_dir: ");

  // set custom js dir
  wstream.write(default_config.config.source.scripts.js_directory);
  wstream.write("\n\t\t},\n\t\tstyles: {\n\t\t\tsass_dir: ");

  // set custom sass dir
  wstream.write(default_config.config.source.styles.sass_directory);
  wstream.write("\n\t\t},\n\t\timage_dir: ");

  //set custom img dir
  wstream.write(default_config.config.source.image_directory);
  wstream.write("\n\t\t},\n\tdestination: ");

  // set custom css destination dir
  wstream.write(default_config.config.destination);
  wstream.write("\n\t}\n};");

  wstream.end();

  console.log('...finished!');

} //end write new config file
