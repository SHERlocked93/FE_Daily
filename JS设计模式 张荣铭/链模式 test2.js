const A = function(selector) {
  return A.fn.init(selector)
}

A.fn = A.prototype = {
  init: function(selector) {
    return document.getElementById(selector)
  },
  length: 2,
  size: function() {
    return this.length
  }
}

console.log(A('center'))