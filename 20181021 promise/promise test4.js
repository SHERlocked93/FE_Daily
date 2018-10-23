/**
 * 创建于 2018/10/23
 * 作者: QianYu
 * 1. Promise存在三个状态（state）pending、fulfilled(resolved)、rejected
 * 2. pending 为初始态，并可以转化为 resolved 和 rejected
 * 3. 成功时，状态变为 resolved，不可转为其他状态
 * 4. 失败时，状态变为 rejected，不可转为其他状态
 * 5. 若是 executor 函数抛错，直接执行 reject()
 * 6. Promise 有一个叫做 then 的方法，里面有两个参数：onResolved、 onRejected
 * 7. state 为 resolved 调用 onResolved，state 为 rejected 调用 onRejected
 * 8. onResolved 必须为函数否则被忽略，第一个参数为终值
 * 9. onRejected 必须为函数否则被忽略，第一个参数为据因
 * 10. 若 state 还为 pending 状态时调 then，那么将 onFulfilled\onRejected 保存起来，一旦reject\resolve，就依次调用
 */

class Promise {
  constructor(executor) {

    this.state = 'pending'      // 状态，可单向转化为 resolved 、 rejected
    this.value = ''             // 终值，转化为resolved的时候
    this.reason = ''            // 据因
    this.onResolvedCbs = []     // onResolved 回调队列
    this.onRejectedCbs = []     // onRejected 回调队列

    const reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        this.onRejectedCbs.forEach(cb => cb())
        console.log(this.reason, ' - Error in function reject')
      }
    }

    const resolve = value => {
      if (this.state === 'pending') {
        this.state = 'resolved'
        this.value = value
        this.onResolvedCbs.forEach(cb => cb())
        console.log(this.value, ' - in function resolved')
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }

  then(onResolved, onRejected) {
    this.state === 'pending' && onResolved instanceof Function && this.onResolvedCbs.push(() => onResolved(this.value))
    this.state === 'pending' && onRejected instanceof Function && this.onRejectedCbs.push(() => onRejected(this.reason))

    this.state === 'resolved' && onResolved(this.value)
    this.state === 'rejected' && onRejected(this.reason)
  }
}

debugger

const prom = new Promise((resolve, reject) => {
  resolve("success啦")
  reject('error啦')
})

prom.then(
  data => console.log(data, ' - data in then function 1'),
  err => console.info(err, ' - err in then function 1'))

prom.then(
  data => console.log(data, ' - data in then function 2'),
  err => console.info(err, ' - err in then function 2'))

prom.then(
  data => console.log(data, ' - data in then function 3'),
  err => console.info(err, ' - err in then function 3'))
