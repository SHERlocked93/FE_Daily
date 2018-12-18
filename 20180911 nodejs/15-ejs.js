/**
 * 创建于 2018/12/18
 * 作者: SHERlocked93
 * 功能: 用一下ejs模板引擎
 */


const ejs = require('ejs')
const fs = require('fs')
const http = require('http')
const path = require('path')
const resolve = dir => path.resolve(__dirname, dir)

http
  .createServer((req, res) => {
    if (req.url === '/favicon.ico') return
    
    fs.readFile(resolve('./test/template.ejs'), (err, data) => {
      if (req.url === '/') {
        const temp = ejs.render(data.toString(), { vers: 'XR', hello: '呵呵那!' })
        res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
        res.end(temp)
      }
    })
    
  })
  .listen(3002)

