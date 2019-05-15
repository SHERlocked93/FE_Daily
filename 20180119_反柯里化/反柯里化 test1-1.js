function unCurrying(fn) {
  return function(tar, ...argu) {
    return fn.apply(tar, argu)
  }
}

const push = unCurrying(Array.prototype.push)

const obj = { a: '嘻嘻' }
push(obj, '呵呵', '哈哈', '嘿嘿')
console.log(obj)

