/**
 * 创建于 2018/12/18
 * 作者: SHERlocked93
 * 功能: 静态资源
 */

const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')

const resolve = dir => path.resolve(__dirname, dir)

http
  .createServer((req, res) => {
    
    let { pathname } = url.parse(req.url)
    if (pathname === '/') pathname = 'index.html'
    const extname = path.extname(pathname)
    
    res.writeHead(200, { 'Content-Type': getMIME(extname) })
    console.log(extname)
    
    fs.readFile(resolve(`./test/` + pathname), (err, data) => {
      
      // 404
      if (err) {
        fs.readFile(resolve(`./test/404.html`), (err, notfount) => {
          if (err) throw err
          res.writeHead(404, { 'Content-Type': 'text/html;charset=UTF8' })
          res.end(notfount)
        })
        return
      }
      
      res.end(data)
    })
  })
  .listen(3002)

/**
 * 获取content-type
 * @param extname
 * @returns {string}
 */
function getMIME(extname) {
  switch (extname) {
    case '.html':
    case '.htm':
      return 'text/html'
    case '.jpeg':
    case '.jpg':
      return 'image/jpeg'
    case '.gif':
      return 'image/gif'
    case '.txt':
      return 'text/plain'
    case '.css':
      return 'text/css'
    default :
      return 'text/html;charset=UTF8'
  }
}
