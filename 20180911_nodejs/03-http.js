const http = require('http')

http
  .createServer(function(req, res) {
    console.log(`服务器接受到了请求 ${req.url}`)
    res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' })
    res.write('点点滴滴')
    res.write('123123')
    res.write('<h1>恶膜某民命秒没</h1>')
    res.write('12312312da')
    res.end('<h1>呵呵呵</h1>')
  })
  .listen(3002, 'localhost')
