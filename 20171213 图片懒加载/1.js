function f(arg) {
  var n = 123 + Number(arg)
  
  return function() {
    console.log('n is ' + n)
    console.log('g is called')
  }
}

var g2 = f(2)
var g3 = f(3)
console.log(g2())
console.log(g3())

var n = 7
console.log(g3())