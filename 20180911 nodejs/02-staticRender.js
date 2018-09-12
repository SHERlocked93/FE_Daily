const http = require('http')
const fs = require('fs')

const server = http.createServer(function(req, res) {
  fs.readFile('./static-html/index.html', function(err, data) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=UTF-8' })
    res.end(data)
  })
})

server.listen(3002, '127.0.0.1')
