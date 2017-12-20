const A = function() {
  return A.fn
}
A.fn = A.prototype = {
  length: 2,
  size: function() {
    return this.length
  }
}

console.log(A().size())