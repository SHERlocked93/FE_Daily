console.log(1)
setTimeout(function() {
  new Promise(function(resolve, reject) {
    console.log(2)
    resolve()
  }).then(function() {
    new Promise(function(resolve, reject) {
      let i = 100000000, n = 0
      while (i--) {n++}
      console.log(3)
      resolve()
    }).then(() => {
      console.log(4)
    })
  })
}, 0)

setTimeout(function() {
  new Promise(function(resolve, reject) {
    console.log(5)
    resolve()
  }).then(() => console.log(6))
}, 0)

setTimeout(function() {
  console.log(7)
}, 0)