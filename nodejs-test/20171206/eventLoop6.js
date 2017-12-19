setTimeout(function timeout() {
  console.log(0)
}, 0)

setImmediate(function A() {
  console.log(1)
  setImmediate(function B() {console.log(2)})
})

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED1')
}, 0)

setTimeout(function timeout() {
  console.log('TIMEOUT FIRED2')
}, 0)


setImmediate(function() {
  setImmediate(function A() {
    console.log(-1)
    setImmediate(function B() {console.log(-2)})
  })
  
  setTimeout(function timeout() {
    console.log('-TIMEOUT FIRED')
  }, 0)
})