Function.prototype.unCurrying = function() {
  const self = this
  return function(...rest) {
    return Function.prototype.call.apply(self, rest)
  }
}

const unCurrying = Function.prototype.unCurrying.unCurrying()
const map = unCurrying(Array.prototype.map)
const sq = map([1, 2, 3],
    function(n) {
      return n * n
    })
console.log(sq); // [1,4,9]