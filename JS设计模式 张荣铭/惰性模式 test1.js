A.on = function(dom, type, fn) {
  if (document.addEventListener) {
    return function(dom, type, fn) {
      dom.addEventListener(type, fn, false)
    }
  } else if (document.attachEvent) {
    return function(dom, type, fn) {
      dom.attachEvent('on' + type, fn)
    }
  } else {
    return function(dom, type, fn) {
      dom['on' + type] = fn
    }
  }
}