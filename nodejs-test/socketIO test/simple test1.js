/**
 * 创建于 2018/3/16
 * 作者: SHERlocked93
 * 功能: https://socket.io/get-started/chat/ 官网实例 demo1
 */

const app = require('express')()
const http = require('http').Server(app)

app.get('/', function(req, res) {
  res.send('<h1>Hello world</h1>')
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})
