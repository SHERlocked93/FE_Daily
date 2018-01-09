/**
 * 创建于 2018/1/8
 * 作者: Qianyu
 * 功能: 偏函数
 */

const isType = function(type) {
  return function(obj) {
    return Object.prototype.toString.call(obj) === `[object ${type}]`
  }
}
const isString = isType('String')
const isFunction = isType('Function')