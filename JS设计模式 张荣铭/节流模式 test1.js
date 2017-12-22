let reduceEvent = ''

function mask1(cb, delay) {
  if (!reduceEvent) {
    reduceEvent = setTimeout(() => {
      cb()
      console.log('执行啦！！')
      reduceEvent = ''
    }, delay)
  }
}

mask1(() => console.log(1), 2000)
mask1(() => console.log(1), 2000)
mask1(() => console.log(1), 2000)