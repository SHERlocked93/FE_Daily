let i = 1
console.log('WORKER TASK: ', 'running');
function simpleCount() {
  i++
  self.postMessage(i)
  setTimeout(simpleCount, 1000)
}

simpleCount()

self.onmessage = ev => {
  postMessage(ev.data + ' 呵呵~')
}