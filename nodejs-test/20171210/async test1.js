let c = 0

function print() {
  console.log(c)
}

function add(cb) {
  setTimeout(() => {
    c++
    cb()
  }, 1000)
}

add(print)