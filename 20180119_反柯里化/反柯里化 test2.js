Function.prototype.unCurrying = function() {
  const self = this
  return function(...rest) {
    return Function.prototype.call.apply(self, rest)
  }
}


const call = Function.prototype.call.unCurrying()

function $(id) {
  return this.getElementById(id)
}

const obj = { getElementById: function(T) {console.log(T + '-呃呃呃')} }
const demo = call($, obj, 'demo')
console.log(demo)