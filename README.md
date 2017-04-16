# WP-Gulp 
## A simple gulpfile for WordPress theme development

### Install Dependancies -- Node JS, NPM, Gulp, Yarn, and LiveReload

1. [Install Node JS](https://nodejs.org/en/download/). To see if Node is already installed, run `node -v` from the command line. NOTE: if your version of Node is less than 5.0, you'll need to update it. 
2. Install Node Package Manager (NPM). Follow these instructions for [Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows), [Mac](http://blog.teamtreehouse.com/install-node-js-npm-mac), or [Linux](http://blog.teamtreehouse.com/install-node-js-npm-linux). 
3. Globally install gulp: `npm install gulp -g`
4. Globally install yarn: `npm install yarn -g`
5. Add and activate LiveReload -- [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en), [Firefox](https://addons.mozilla.org/en-US/firefox/addon/livereload/).

### WP-Gulp Installation

1. From the 'wp-content' directory of your WordPress site, run the following command: `git clone https://github.com/wphogan/wp-gulp.git`
2. Enter the new 'wp-gulp' directory and run `yarn install`.
3. Once installed, open `gulpfile_config.js` and replace `custom_theme` with the name of your theme.
4. Make sure the SCSS, CSS, and JS directories listed in `gulpfile_config.js` reflect your theme's folder structure.

###  WP-Gulp Tasks

#### Default Gulp task: `gulp`

From the 'wp-gulp' directory, run `gulp`. This task will watch for file changes. If a SCSS file is edited, it runs the `gulp styles` task (see below) and reloads the changes in the browser via LiveReload.  

#### Other Gulp tasks:

- `gulp styles`
  - compile, auto-prefix, and minify SCSS files in the Sass folder into a single CSS file. A source map is added to directory of the CSS file. Errors in SCSS code will produce a desktop alert (Mac only).
- `gulp js`
  - concatenate and minify all non-minified javascript files in the theme's javascript directory. Newly minified files are suffixed with `.min.js`.
- `gulp images`
  - optimize any images in the theme's images folder
- `gulp comb`
  - "combs" the SCSS file -- organizes properties, adds and removes spaces and tabs as necessary, etc. For full configuration list, see `config/csscomb_config.json` in the `wp-gulp` directory.
- `gulp lint`
  - checks SCSS file primarily for mergeable selectors and duplicate properties. For full configuration list, see `config/sass_lint_config.yml` in the `wp-gulp` directory.
- `gulp clean`
  - sequentially runs `gulp comb`, `gulp lint`, and `gulp images`


### Tips for Quick WP-Gulp Installation and Execution (Mac)
This will save you time installing and running WP-Gulp. It allows you to run the installation with a single command from the site's root directory. It also allows you to run the default gulp task from the root directory.

Edit your `bash_profile`:

    open ~/.bash_profile
    
And add the following code to it:

```
alias gulprun='cd wp-content/wp-gulp && gulp' 
alias gulpnew='cd wp-content/ && git clone https://github.com/wphogan/wp-gulp && cd wp-gulp && open gulpfile_config.js && yarn install'
```
Close and reopen the terminal window. With this new bash_profile, entering `gulpnew` from the root of a WordPress site will install WP-Gulp within the wp-content folder.

It'll also allow you to run the default gulp task 'gulp' from the site's root by entering `gulprun`.
