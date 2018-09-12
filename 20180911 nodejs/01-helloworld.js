const http = require('http')

const server = http.createServer(function(req, res) {
  res.writeHead(200, { 'Content-type': 'text/html;charset=UTF-8' })
  res.end('第一个 Node demo')
})

server.listen(3002, '127.0.0.1')
