/**
 * 创建于 2018/1/8
 * 作者: Qianyu
 * 功能: 柯里化  提前返回
 */

var addEvent = (function() {
  if (window.addEventListener) {
    return function(el, sType, fn, capture) {
      el.addEventListener(sType, function(e) {
        fn.call(el, e)
      }, (capture))
    }
  } else if (window.attachEvent) {
    return function(el, sType, fn, capture) {
      el.attachEvent("on" + sType, function(e) {
        fn.call(el, e)
      })
    }
  }
})()