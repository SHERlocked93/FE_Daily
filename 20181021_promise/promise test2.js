/**
 * 创建于 2018/10/23
 * 作者: QianYu
 * 1. Promise存在三个状态（state）pending、fulfilled(resolved)、rejected
 * 2. pending 为初始态，并可以转化为 resolved 和 rejected
 * 3. 成功时，状态变为 resolved，不可转为其他状态
 * 4. 失败时，状态变为 rejected，不可转为其他状态
 * 5. 若是 executor 函数抛错，直接执行 reject()
 */

class Promise {
  constructor(executor) {

    if (!(this instanceof Promise)) return new Promise(executor)

    this.state = 'pending'      // 状态，可单向转化为 resolved 、 rejected
    this.value = ''             // 终值，转化为resolved的时候
    this.reason = ''            // 据因

    const reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
        console.error(this.reason.message, ' - Error in function reject')
      }
    }

    const resolve = value => {
      if (this.state === 'pending') {
        this.state = 'resolved'
        this.value = value
        console.log(this.value, ' - in function resolved')
      }
    }

    try {
      executor(resolve, reject)
    } catch (e) {
      reject(e)
    }
  }
}

const prom = new Promise((resolve, reject) => {
  debugger
  throw new Error('呵呵呵')
  reject('error啦')
  resolve("success啦")
})
