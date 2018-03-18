/**
 * 创建于 2017/12/19
 * 作者: SHERlocked93
 * 功能: http://www.cnblogs.com/TomXu/archive/2012/04/18/2437099.html
 */

const SuperMarry = (function() {
  let _currentState = [],
      states = {
        jump() {console.log('跳跃!')},
        move() {console.log('移动!')},
        shoot() {console.log('射击!')},
        squat() {console.log('蹲下!')}
      }
  
  const Action = {
    changeState(arr) {   // 更改当前动作
      _currentState = arr
      return this
    },
    goes() {
      console.log('触发动作')
      _currentState.forEach(T => states[T] && states[T]())
      return this
    }
  }
  
  return {
    change: Action.changeState,
    go: Action.goes
  }
})()

SuperMarry
    .change(['jump', 'shoot'])
    .go()                     // 触发动作  跳跃!  射击!
    .go()                     // 触发动作  跳跃!  射击!
    .change(['squat'])
    .go()                     // 触发动作  蹲下!
