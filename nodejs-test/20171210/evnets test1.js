let { EventEmitter } = require('events')
let life = new EventEmitter().setMaxListeners(11)
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 1')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 2')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 3')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 4')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 5')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 6')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 7')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 8')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 9')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 10')
})
life.on('求安慰', function(name) {
  console.log(name + '要么么哒 11')
})
life.on('求溺爱', function(name) {
  console.log(name + '要么么哒 11')
})
life.on('求溺爱', function(name) {
  console.log(name + '要么么哒 11')
})

life.emit('求安慰', '我')
console.log(life.listenerCount('求安慰'))

life.removeListener('求安慰')

