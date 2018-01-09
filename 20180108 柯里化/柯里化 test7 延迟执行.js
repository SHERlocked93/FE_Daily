/**
 * 创建于 2018/1/8
 * 作者: Qianyu
 * 功能: 柯里化 延迟执行
 */
const curry = function(fn) {
  const _args = []
  return function cb(...rest) {
    if (rest.length === 0) {
      return fn.apply(this, _args)
    }
    _args.push(...rest)
    return cb
  }
}

curry((...T) => {
  T.reduce((sum, single) => sum += single)    // 输出:10
})(1)(2)(3)(4)()