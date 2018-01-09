/**
 * 创建于 2018/1/9
 * 作者: Qianyu
 * 功能: 疯狂柯里化函数
 */
const _ = {}

/**
 * 疯狂柯里化
 * @param fn
 * @param length
 * @param args
 * @param holes
 * @returns {Function}
 */
function crazyCurryingHelper(fn, length, args, holes) {
  length = length || fn.length    // 第一遍是fn所需的参数个数，以后是
  args = args || []
  holes = holes || []
  
  return function(...rest) {
    let _args = args.slice(),
        _holes = holes.slice(),
        argLength = _args.length,        // 存储接收到的args和holes的长度
        holeLength = _holes.length,
        arg, i = 0
    for (; i < rest.length; i++) {
      arg = rest[i]
      if (arg === _ && holeLength) {
        holeLength--                  // 循环_holes的位置
        _holes.push(_holes.shift())   // _holes最后一个移到第一个
      } else if (arg === _) {
        _holes.push(argLength + i)       // 存储_hole就是_的位置
      } else if (holeLength) {           // 是否还有没有填补的hole
        holeLength--
        _args.splice(_holes.shift(), 0, arg)       // 在参数列表指定hole的地方插入当前参数
      } else {
        _args.push(arg)        // 不需要填补hole,直接添加到参数列表里面
      }
    }
    
    return _args.length >= length                      // 递归的进行柯里化
        ? fn.apply(this, _args)
        : crazyCurryingHelper.call(this, fn, length, _args, _holes)
  }
}

function sayHello(name, age, fruit) { console.log(`我叫 ${name},我 ${age} 岁了, 我喜欢吃 ${fruit}`) }

const betterShowMsg = crazyCurryingHelper(sayHello)
betterShowMsg(_, 20)('小衰', _, '西瓜')  // 我叫 小衰,我 20 岁了, 我喜欢吃 西瓜
betterShowMsg(_, _, '南瓜')('小猪')(25)  // 我叫 小猪,我 25 岁了, 我喜欢吃 南瓜
betterShowMsg('小明')(_, 22)(_, _, '倭瓜')  // 我叫 小明,我 22 岁了, 我喜欢吃 倭瓜
betterShowMsg('小拽')(28)('冬瓜')  // 我叫 小拽,我 28 岁了, 我喜欢吃 冬瓜