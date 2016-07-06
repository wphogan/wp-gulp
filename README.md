# wp-gulp 
##### A simple gulpfile for WordPress theme development
------
*Requires Node Package Manager.* Instructions for installing NPM on [Windows](http://blog.teamtreehouse.com/install-node-js-npm-windows), [Mac](http://blog.teamtreehouse.com/install-node-js-npm-mac), and [Linux](http://blog.teamtreehouse.com/install-node-js-npm-linux).

### Installation
1. Copy wp-gulp to the 'wp-content' folder: `git clone git@github.com:wphogan/wp-gulp.git`
2. From the new 'wp-gulp' directory, run `npm install`.
3. From the 'wp-gulp' directory, run `gulp`.
4. The `gulp` command is configured with LiveReload. It automatically injects CSS edits into the browser. Add and activate LiveReload to [Chrome](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) or [Firefox](https://addons.mozilla.org/en-US/firefox/addon/livereload/).

### Setup
1. Once installed, open 'gulpfile.js' and replace 'custom_theme' with the name of the theme.
2. Make sure the Sass and CSS directories listed in gulpfile.js are accurate.


### Gulp Tasks:
- **gulp**
  - gulp will watch changes made to SCSS files in the Sass folder. Once a file is changed, it runs the 'styles' task, and injects the new CSS into the browser via LiveReload.
- **gulp styles**
  - gulp styles compiles, auto-prefixes, and minifies SCSS files in the Sass folder into a single CSS file. A source map is added to the CSS file. Errors in Sass code will produce a desktop alert (Mac only).
- **gulp js**
  - gulp js will concatenate and minify all non-minified javascript files in the theme's javascript directory
- **gulp images** 
  - gulp images will optimize any images in the theme's image folder

### Automate WP-Gulp Installation and Execution (Mac)
To rapidly add and run WP-Gulp to a WordPress site, edit your bash_profile:
```sh
$ edit .bash_profile
```
And add the following code to it:
```
alias rungulp='cd wp-content/wp-gulp && gulp' 
alias newgulp='cd wp-content/ && git clone https://github.com/wphogan/wp-gulp && cd wp-gulp && edit gulpfile.js && npm install'
```
With this bash_profile, entering `newgulp` from the root of a WordPress site will install the wp-gulp folder within the wp-content folder.

After gulp is installed, entering `rungulp` from the site's root will run the default gulp task 'gulp'.