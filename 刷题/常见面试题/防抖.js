function debounce(func, wait, imme) {
    let timer
    return function(...rest) {
        if (imme && !timer) {
            func.apply(this, rest)
        }
        timer && clearTimeout(timer)
        timer = setTimeout(() => func.apply(this, rest), wait)
    }
}

/**************************/

const fn = debounce(() => {
    console.log(1)
}, 1000, true)

setInterval(fn, 5000)
setTimeout(fn, 1000)
