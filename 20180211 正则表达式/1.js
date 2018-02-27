const hehe = function* () {
  yield 'animal'
  yield 'dog'
  yield 'husky'
}()

Object.defineProperty(window, 'a', {
  get() {
    return hehe.next().value
  }
})
