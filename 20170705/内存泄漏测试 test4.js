var ClassA = function(name) {
  this.name = name
  this.func = null
}

var a = new ClassA("a")
var b = new ClassA("b")

b.func = bind(function() {
  console.log("I am " + this.name)
}, a)

b.func()     // 输出: I am a

a = null        // 释放a
//b = null;        // 释放b

//模拟上下文绑定
function bind(func, self) {
  return function() {
    return func.apply(self)
  }
}