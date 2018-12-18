const http = require('http')

http
  .createServer(function(req, res) {
    res.writeHead(200, { 'Content-type': 'text/html;charset=UTF-8' })
    res.end('第一个 Node demo1')
  })
  .listen(3002, () => {
    console.log('Server Running At 3002 !')
  })
