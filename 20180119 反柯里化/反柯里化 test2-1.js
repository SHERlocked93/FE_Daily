function unCurrying(fn) {
  return function(tar, ...argu) {
    return fn.apply(tar, argu)
  }
}


const call = unCurrying(Function.prototype.call)

function $(id) {
  return this.getElementById(id)
}

const obj = { getElementById: function(T) {console.log(T + '-呃呃呃')} }
const demo = call($, obj, 'demo')