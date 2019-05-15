/**
 * 创建于 2018/12/18
 * 作者: SHERlocked93
 * 功能: 给每一个访问者加一个id，这样可以探究node事件环机制
 */

const http = require('http')
const fs = require('fs')
const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
    
    fs.readFile(resolve('./test/1.txt'), (err, data) => {
      if (err) throw err
      res.end(data)
    })
  })
  .listen(3002)
