//
// Mac error handling
//
var onError = function (err) {  
  console.log(err.toString())
  this.emit("error", new Error("Something happened: Error message!"))
  this.emit('end')
};
 function handleError (err) {  
  console.log(err.toString())
  this.emit('end')
};


