const decorator = function(input, fn) {
  const input = document.getElementById(input)
  if (typeof input === 'function') {
    const oldClickFn = input.onclick
    input.onclick = function() {
      oldClickFn()
      fn()
    }
  } else {
    input.onclick = fn()
  }
}