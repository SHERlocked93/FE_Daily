const http = require('http')

const server = http.createServer(function(req, res) {
  console.log(`服务器接受到了请求 ${req.url}`)
  res.writeHead(200, {
    'Content-Type': 'text/html;charset=utf-8'
  })
  res.write('123123')
  res.write('12312312da')
  res.end('<h1>呵呵呵</h1>')
})

server.listen(3002, 'localhost')