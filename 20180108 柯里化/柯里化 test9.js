/**
 * 创建于 2018/1/9
 * 作者: SHERlocked93
 * 功能: 高阶柯里化函数
 */


function curryingHelper(fn, len) {
  console.log(fn, fn.length)
  const length = len || fn.length   // 第一遍运行length是函数fn一共需要的参数个数，以后是剩余所需要的参数个数
  return function(...rest) {
    return rest.length >= length
        ? fn.apply(this, rest)
        : curryingHelper(currying.apply(this, [fn].concat(rest)), length - rest.length)
  }
}

function currying(fn, ...rest) {
  const args = rest
  return function(...rest) {
    return fn.apply(null, args.concat(...rest))
  }
}

function sayHello(name, age, fruit) {
  console.log(`我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`)
}

const betterShowMsg = curryingHelper(sayHello)
betterShowMsg('小衰', 20, '西瓜')  // 我叫 小衰,我 20 岁了, 我喜欢吃 西瓜
betterShowMsg('小猪')(25, '南瓜')  // 我叫 小明,我 22 岁了, 我喜欢吃 南瓜
betterShowMsg('小明', 22)('倭瓜')  // 我叫 小明,我 22 岁了, 我喜欢吃 倭瓜
betterShowMsg('小拽')(28)('冬瓜')  // 我叫 小拽,我 28 岁了, 我喜欢吃 冬瓜