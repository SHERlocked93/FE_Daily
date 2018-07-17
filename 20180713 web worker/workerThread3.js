let port
onmessage = function(e) {
  if (e.data === "initial port") {
    port = e.ports[0]
    port.onmessage = function(e) {
      postMessage(e.data)
    }
  }
}