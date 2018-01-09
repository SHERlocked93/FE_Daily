/**
 * 创建于 2018/1/8
 * 作者: Qianyu
 * 功能: 柯里化通用实现
 */

function currying(fn) {
  var args = [].slice.call(arguments, 1)
  return function() {
    return fn.apply(null, args.concat(...arguments))
  }
}