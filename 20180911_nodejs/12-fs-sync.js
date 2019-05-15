/**
 * 创建于 2018/12/18
 * 作者: SHERlocked93
 * 功能: 异步变同步
 */

const http = require('http')
const fs = require('fs')
const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') return
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
    
    fs.readdir(resolve('./static'), { withFileTypes: true }, (err, files) => {
      if (err) throw err
      console.log(files
        .filter(file => file.isDirectory())
        .map(file => file.name))
      
      res.end()
    })
    res.write('23123')
  })
  .listen(3002)
