/**
 * 创建于 2018/10/23
 * 作者: QianYu
 * 1. Promise存在三个状态（state）pending、fulfilled(resolved)、rejected
 * 2. pending 为初始态，并可以转化为 resolved 和 rejected
 * 3. 成功时，状态变为 resolved，不可转为其他状态
 * 4. 失败时，状态变为 rejected，不可转为其他状态
 * 5. 若是 executor 函数抛错，直接执行 reject()
 * 6. Promise 有一个叫做 then 的方法，里面有两个参数：onFulfilled、 onRejected
 * 7. state 为 resolved 调用 onFulfilled，state 为 rejected 调用 onRejected
 * 8. onFulfilled 必须为函数否则被忽略，第一个参数为终值
 * 9. onRejected 必须为函数否则被忽略，第一个参数为据因
 * 10. 若 state 还为 pending 状态时就调 then，那么将 onFulfilled\onRejected 保存起来，一旦reject\resolve，就依次调用
 * 11. then 方法为链式调用，返回一个新的promise2，如果return的值不是promise则返回一个将其作为终值的一个resolved的promise
 */

class Promise {
  constructor(executor) {

    this.state = 'pending'      // 状态，可单向转化为 resolved 、 rejected
    this.value = ''             // 终值
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
    let promise2
    onResolved instanceof Function || (onResolved = () => {})
    onRejected instanceof Function || (onRejected = () => {})

    this.state === 'resolved' && (promise2 = new Promise((resolve, reject) => {
      try {
        const x = onResolved(this.value)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    }))

    this.state === 'rejected' && (promise2 = new Promise((resolve, reject) => {
      try {
        const x = onRejected(this.reason)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    }))

    this.state === 'pending' && (promise2 = new Promise((resolve, reject) => {
      this.onResolvedCbs.push(() => {
        try {
          const x = onResolved(this.value)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      })

      this.onRejectedCbs.push(() => {
        try {
          const x = onRejected(this.reason)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      })

    }))

    return promise2
  }
}

debugger

const prom = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve(100)
    reject('error啦')
  }, 1000)
})

prom
  .then(data => {
    console.log(data, ' - then 1')
    return 1 + data
  })
  .then(data => {
    console.log(data, ' - then 2')
    return 2 + data
  })
  .then(
    data => 3 + data,
    err => console.info(err, ' - err in then function 3'))

prom.then(data => data + ' --- emm')
