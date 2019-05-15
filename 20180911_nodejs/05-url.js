const http = require('http')
const url = require('url')

const server = http.createServer(function(req, res) {
  console.log(`服务器接受到了请求 ${req.url}`)
  const path = url.parse(req.url, true)
  const query = path.query
  
  console.log(query)
  console.log("id: " + query.id)
  // console.log('pathname: ' + path.pathname)
  // console.log('hash  : ' + path.hash)
  // console.log('query: ' + path.query)
  
  res.end(`<h1>123</h1>`)
})

server.listen(3002, 'localhost')
