console.log('1')
setTimeout(function() {
  console.log('2')
  new Promise(function(resolve) {
    console.log('4')
    resolve()
  }).then(function() {
    console.log('5')
  })
  setTimeout(() => {
    console.log('haha')
  })
  new Promise(function(resolve) {
    console.log('6')
    resolve()
  }).then(function() {
    console.log('66')
  })
})

setTimeout(function() {
  console.log('hehe')
}, 0)

new Promise(function(resolve) {
  console.log('7')
  resolve()
}).then(function() {
  console.log('8')
})

setTimeout(function() {
  console.log('9')
  new Promise(function(resolve) {
    console.log('11')
    resolve()
  }).then(function() {
    console.log('12')
  })
})

new Promise(function(resolve) {
  console.log('13')
  resolve()
}).then(function() {
  console.log('14')
})

// node   : 1,7,13,8,14,2,4,6,hehe,9,11,5,66,12,haha
// chrome : 1,7,13,8,14,2,4,6,5,66,hehe,9,11,12,haha