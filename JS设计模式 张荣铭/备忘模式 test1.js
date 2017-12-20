const memorize = function(fn) {
  const cache = {}
  return function(...args) {
    const _args = JSON.stringify(args)
    return cache[_args] || (cache[_args] = fn.apply(fn, args))
  }
}
const add = function(a) {
  return a + 1
}
const adder = memorize(add)
adder(1)    // 2    cache: { '[1]': 2 }
adder(1)    // 2    cache: { '[1]': 2 }
adder(2)    // 3    cache: { '[1]': 2, '[2]': 3 }