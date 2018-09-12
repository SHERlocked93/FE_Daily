const http = require('http')

const server = http.createServer(function(req, res) {
  console.log(`服务器接受到了请求 ${req.url}`)
  res.end(`<h1>123</h1>`)
})

server.listen(3002, 'localhost')
