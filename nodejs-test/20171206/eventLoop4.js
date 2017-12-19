console.log(1)
setTimeout(function() {
  new Promise(function(resolve, reject) {
    console.log(2)
    resolve()
  })
      .then(() => {
        console.log(3)
      })
}, 0)

setTimeout(function() {
  console.log(4)
}, 0)