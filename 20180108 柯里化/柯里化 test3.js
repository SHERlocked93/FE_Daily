/**
 * 创建于 2018/1/8
 * 作者: Qianyu
 * 功能: 柯里化  提前返回
 */

var addEvent = function(el, type, fn, capture) {
  if (window.addEventListener) {
    el.addEventListener(type, function(e) {
      fn.call(el, e)
    }, capture)
  } else if (window.attachEvent) {
    el.attachEvent("on" + type, function(e) {
      fn.call(el, e)
    })
  }
}