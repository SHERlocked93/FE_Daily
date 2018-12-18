const http = require('http')
const url = require('url')

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
    
    const queryObj = url.parse(req.url, true).query
    const name = queryObj.name
    const id = queryObj.id
    
    res.end(`服务器收到表单请求： ${name} - ${id}`)
  })
  .listen(3002, () => console.log('Start running on 3002!'))
