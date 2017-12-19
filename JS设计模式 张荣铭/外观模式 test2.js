const getEvent = function(event) {   // 获取事件对象
  return event || window.event      // IE下window.event
}

const getTarget = function(event) {         // 获取事件元素
  const event = getEvent(event)
  return event.target || event.srcElement   // IE下event.srcElement
}

const preventDefault = function(event) {    // 阻止默认事件
  const event = getEvent(event)
  if (event.preventDefault) {event.preventDefault()}
  else {event.returnValue = false}          // IE下
}

const cancelBubble = function(event) {
  const event = getEvent(event)
  if (event.stopPropagation) {event.stopPropagation()}
  else {event.cancelBubble = true}      // IE下
}

document.onclick = function(e) {
  preventDefault(e)
  if (getTarget(e) !== document.getElementById('myinput')) {console.log('呵呵')}
}