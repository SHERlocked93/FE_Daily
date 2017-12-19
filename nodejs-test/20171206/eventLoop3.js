console.log('1')
setTimeout(() => {
  new Promise(function(resolve) {
    console.log('7')
    resolve()
  }).then(function() {
    console.log('8')
    new Promise(function(resolve) {
      console.log(23)
      setTimeout(function() {console.log(31)}, 0)
      resolve()
    }).then(() => {
      console.log(24)
      setTimeout(function() {console.log(32)}, 0)
    })
  })
})

setTimeout(() => {
  new Promise(function(resolve) {
    console.log('13')
    resolve()
  }).then(function() {
    console.log('14')
    new Promise(function(resolve) {
      console.log(25)
      setTimeout(function() {console.log(33)}, 0)
      resolve()
    }).then(() => {
      console.log(26)
      setTimeout(function() {console.log(34)}, 0)
    })
  })
})

// node   : 1,7,13,8,23,14,25,24,26,31,33,32,34
// chrome : 1,7,8,23,24,13,14,25,26,31,32,33,34
