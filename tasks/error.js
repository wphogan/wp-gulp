//
// Mac error handling
//
module.exports = {
  onError: function (err) {  
    console.log(err.toString())
    this.emit("error", new Error("Something happened: Error message!"))
    this.emit('end')
  },
   handleError: function (err) {  
    console.log(err.toString())
    this.emit('end')
  },
  temp: function () {
    message: "Oh shit, error on line: <%= error.line %> "
  },        
};