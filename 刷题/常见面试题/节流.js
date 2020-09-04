function throttle(func, wait) {
    let lastTime
    return function(...rest) {
        if (!lastTime ||
          (new Date().getTime() - lastTime > wait)) {
            lastTime = +new Date()
            func.apply(this, rest)
        }
    }
}

/**************************/

setInterval(
  throttle(() => {
      console.log(1)
  }, 1000),
  1
)
