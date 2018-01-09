/**
 * 创建于 2018/1/8
 * 作者: Qianyu
 * 功能: 偏函数
 */

var currying = function(fn) {
  var args = [].slice.call(arguments, 1)
  return function() {
    return fn.apply(null, args.concat(...arguments))
  }
}

function square(i) { return i * i }

function dubble(i) { return i * 2 }

function map(handler, arr) { return arr.map(handler) }

var mapSQ = currying(map, square)
mapSQ([1, 2, 3, 4, 5])
mapSQ([6, 7, 8, 9, 10])

var mapDB = currying(map, dubble)
mapDB([1, 2, 3, 4, 5])
mapDB([6, 7, 8, 9, 10])



