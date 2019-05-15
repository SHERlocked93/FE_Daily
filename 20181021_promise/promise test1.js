/**
 * 创建于 2018/10/23
 * 作者: QianYu
 * 1. Promise存在三个状态（state）pending、fulfilled(resolved)、rejected
 * 2. pending 为初始态，并可以转化为 resolved 和 rejected
 * 3. 成功时，状态变为 resolved，不可转为其他状态
 * 4. 失败时，状态变为 rejected，不可转为其他状态
 */

class Promise {
  constructor(executor) {

    this.state = 'pending'      // 状态，可单向转化为 resolved 、 rejected
    this.value = ''             // 终值，转化为resolved的时候
    this.reason = ''            // 据因

    const reject = reason => {
      if (this.state === 'pending') {
        this.state = 'rejected'
        this.reason = reason
      }
    }

    const resolve = value => {
      if (this.state === 'pending') {
        this.state = 'resolved'
        this.value = value
      }
    }

    executor(resolve, reject)
  }
}

const prom = new Promise((resolve, reject) => {
  debugger
  reject('error啦')
  resolve("success啦")
})
