setImmediate(function() {
  console.log('setImmediate 延迟执行')
})
process.nextTick(function() {
  console.log('nextTick 延迟执行')
})

console.log('正常执行')