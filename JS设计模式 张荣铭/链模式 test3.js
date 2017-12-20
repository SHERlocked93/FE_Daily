const A = function(selector) {
  return new A.fn.init(selector)
}

A.fn = A.prototype = {
  init: function(selector) {
    this[0] = document.getElementById(selector)
    this.length = 1
    return this
  },
  length: 2,
  size: function() {
    return this.length
  }
}

A.prototype.init.prototype = A.fn

console.log(A('center'))