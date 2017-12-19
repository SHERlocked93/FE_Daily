function addEvent(dom, type, fn) {
  if (dom.addEventListener) {       // 支持DOM2级事件处理方法的浏览器
    dom.addEventListener(type, fn, false)
  } else if (dom.attachEvent) {     // 不支持DOM2级但支持attachEvent
    dom.attachEvent('on' + type, fn)
  } else {
    dom['on' + type] = fn       // 都不支持的浏览器
  }
}

const myInput = document.getElementById('myinput')
addEvent(myInput, 'click', function() {console.log('绑定 click 事件')})