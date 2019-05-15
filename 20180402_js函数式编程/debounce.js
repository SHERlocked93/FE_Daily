let reduceEvent

function debounce(cb, delay) {
  if (!reduceEvent) {
    reduceEvent = setTimeout(() => {
      cb()
      console.log('执行啦！！')
      reduceEvent = null
    }, delay)
  }
}

setTimeout(() => debounce(() => console.log(1), 2000), 1000) // 打印: 1 执行啦！！
setTimeout(() => debounce(() => console.log(2), 2000), 2000)
setTimeout(() => debounce(() => console.log(3), 2000), 2000)
setTimeout(() => debounce(() => console.log(4), 2000), 4000) // 打印: 4 执行啦！！
