function throttle(func, wait = 200) {
  let last = 1
  let timer
  return function(...rest) {
    const now = +new Date()
    if (last && now - last < wait) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        func.apply(this, rest)
      }, wait)
    } else {
      last = now
      func.apply(this, rest)
      clearTimeout(timer)
    }
  }
}

const task = throttle(() => console.log(1), 2000)
setTimeout(task, 0)
setTimeout(task, 500)
setTimeout(task, 1000)
setTimeout(task, 2000) // 打印: 1 1
