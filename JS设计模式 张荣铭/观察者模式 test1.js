/**
 * 创建于 2017/12/19
 * 作者: SHERlocked93
 * 功能: http://www.cnblogs.com/TomXu/archive/2012/03/02/2355128.html
 */

// IIFE 方式
const Observer = (function() {
  const _message = {}   // 消息队列
  return {
    regist(type, fn) {          // 订阅
      _message[type]
          ? _message[type].push(fn)
          : _message[type] = [fn]
    },
    emit(type, payload) {          // 发布
      if (!_message[type]) {
        return
      }
      _message[type].forEach(event => event(payload))
    },
    remove(type, fn) {             // 退订
      if (!_message[type].includes(fn)) {return}
      const idx = _message[type].indexOf(fn)
      _message[type].splice(idx, 1)
    }
  }
})()
