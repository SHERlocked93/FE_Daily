process.nextTick(function() {
  console.log('nextTick 延迟执行1')
})
setImmediate(function() {
  console.log('setImmediate 延迟执行2')
  process.nextTick(function() {
    console.log('nextTick 延迟执行3')
  })
})
setImmediate(function() {
  console.log('setImmediate 延迟执行1')
})
process.nextTick(function() {
  console.log('nextTick 延迟执行2')
})

console.log('正常执行')