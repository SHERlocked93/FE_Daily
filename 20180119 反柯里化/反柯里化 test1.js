Function.prototype.unCurrying = function() {
  const self = this
  return function(...rest) {
    return Function.prototype.call.apply(self, rest)
  }
}

// Function.prototype.uncurrying = function() {
//   return this.call.bind(this)
// }

const push = Array.prototype.push.unCurrying()

const obj = { a: '嘻嘻' }
push(obj, '呵呵', '哈哈', '嘿嘿')
console.log(obj)

