let port
onmessage = function(e) {
  if (e.data === "initial port") {
    port = e.ports[0]
    setTimeout(function() {
      port.postMessage("this is from worker1")
    }, 2000)
  }
}