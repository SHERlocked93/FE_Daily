/**
 * 创建于 2018/1/8
 * 作者: SHERlocked93
 * 功能: 柯里化 延迟执行
 */
const curryAdd = function(...rest) {
  const _args = rest
  return function cb(...rest) {
    if (!rest.length) {
      return _args.reduce((sum, single) => sum += single)
    } else {
      _args.push(...rest)
      return cb
    }
  }
}
curryAdd(1)(2)(3)(4)() // 输出: 10