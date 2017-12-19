const http = require('http')
const fs = require('fs')


http.createServer(function(req, res) {
  // fs.readFile('D:\\图片\\11.jpg', function(err, res) {
  //   if (err) {
  //     console.error(err)
  //     res.end('file not exist!')
  //   }
  //   else {
  //     res.writeHeader(200, { 'Context-Type': 'text/html' })
  //     res.end(data)
  //   }
  // })
  
  fs.createReadStream('D:\\图片\\11.jpg').pipe(res)
}).listen(9090)