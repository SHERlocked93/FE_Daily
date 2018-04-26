// 按照标准：https://promisesaplus.com/   来写的Promise
// 参考：https://segmentfault.com/l/1500000012002932     ps:讲的垃圾
// pending -> fulfilled/resolved & rejected

function Promise(executor) {
  const self = this
  if (!(self instanceof Promise)) { return new Promise(executor) }
  
  self.resolvedCallbacks = [] // 标准 2.2.6 : then可能调用多次，顺序执行 resolvedCallbacks 中的回调函数
  self.rejectedCallbacks = [] // callback
  self.status = 'pending' // 状态
  self.data = undefined // resolve与reject的返回值
  
  try {
    executor(resolve, reject) // 执行executer
  } catch (e) {
    reject(e)
  }
  
  function resolve(value) {
    if (self.status !== 'pending') return
    self.status = 'resolved'
    self.data = value
    let f
    for (let i = 0; i < self.resolvedCallbacks.length; i++) {
      f = self.resolvedCallbacks[i] // 标准 2.2.5 : 需要作为函数来调用而不是方法(对象的属性)
      f(value)
    }
  }
  
  function reject(reason) {
    if (self.status !== 'pending') return
    self.status = 'rejected'
    self.data = reason
    let f
    for (let i = 0; i < self.rejectedCallbacks.length; i++) {
      f = self.rejectedCallbacks[i] // 标准 2.2.5 : 需要作为函数来调用而不是方法(对象的属性)
      f(reason)
    }
  }
}

Promise.prototype.then = function(onResolved, onRejected) {
  const self = this
  if (typeof onResolved !== 'function') onResolved = function() {}
  if (typeof onRejected !== 'function') onRejected = function() {}
  
  // then的时候是 resolved 状态
  if (self.status === 'resolved') {
    return new Promise(function(resolve, reject) {
      try {
        const x = onResolved(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  
  // then的时候是 rejected 状态
  if (self.status === 'rejected') {
    return new Promise(function(resolve, reject) {
      try {
        const x = onRejected(self.data)
        if (x instanceof Promise) {
          x.then(resolve, reject)
        } else {
          resolve(x)
        }
      } catch (e) {
        reject(e)
      }
    })
  }
  
  // then的时候是 pending 状态
  if (self.status === 'pending') {
    return new Promise(function(resolve, reject) {
      self.resolvedCallbacks.push(function(value) {
        try {
          const x = onResolved(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      })
      
      self.rejectedCallbacks.push(function(reason) {
        try {
          const x = onRejected(self.data)
          if (x instanceof Promise) {
            x.then(resolve, reject)
          } else {
            resolve(x)
          }
        } catch (e) {
          reject(e)
        }
      })
    })
  }
}

const p = new Promise(function(resolve, reject) {
  // 做一些异步操作
  debugger
  setTimeout(function() {
    console.log('执行完成')
    resolve('随便什么数据')
  }, 2000)
}).then(
  T => console.log(T + ' then执行'),
  T => console.log(T + ' 错误？')
)
