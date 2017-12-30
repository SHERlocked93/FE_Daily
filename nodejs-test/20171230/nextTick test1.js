process.nextTick(function() {
  console.log('next tick 1')
  process.nextTick(function() {
    console.log('next tick 2')
  })
  process.nextTick(function() {
    console.log('next tick 3')
  })
})

setTimeout(function() {
  console.log('set timeout')
}, 0)
setImmediate(function() {
  console.log('set Immediate')
})
console.log('开始了')