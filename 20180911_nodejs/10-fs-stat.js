/**
 * 创建于 2018/12/18
 * 作者: SHERlocked93
 * 功能: fs模块的mkdir函数，创建文件夹
 */

const http = require('http')
const fs = require('fs')
const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') return
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
    fs.stat(resolve('./test/1.txt'), (err, data) => {
      if (err) throw err
      console.log(data)
      
      res.end()
    })
  })
  .listen(3002)
