A.on = function(dom, type, fn) {
  if (document.addEventListener) {
    A.on = function(dom, type, fn) {
      dom.addEventListener(type, fn, false)
    }
  } else if (document.attachEvent) {
    A.on = function(dom, type, fn) {
      dom.attachEvent('on' + type, fn)
    }
  } else {
    A.on = function(dom, type, fn) {
      dom['on' + type] = fn
    }
  }
  
  A.on(dom, type, fn)
}