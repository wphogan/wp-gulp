//
// Mac error handling
//
module.exports = function (gulp, plugins, theme_dir, sass_dir, css_dir) {
    return function () {
        var onError = function (err) {  
          console.log(err.toString())
          this.emit("error", new Error("Something happened: Error message!"))
          this.emit('end')
        };
         function handleError (err) {  
          console.log(err.toString())
          this.emit('end')
        };
    };
};