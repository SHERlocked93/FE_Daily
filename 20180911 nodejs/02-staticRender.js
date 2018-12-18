//require表示引包，引包就是引用自己的一个特殊功能
const http = require("http")
const fs = require("fs")
const path = require('path')

const resolve = dir => path.resolve(__dirname, dir)

http.createServer(function(req, res) {
    console.log(req.url, ' -url')
    if (req.url === "/fang") {
      fs.readFile(resolve("./test/xixi.html"), function(err, data) {
        res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" })
        res.end(data)
      })
    } else if (req.url === "/yuan") {
      fs.readFile(resolve("./test/haha.html"), function(err, data) {
        res.writeHead(200, { "Content-type": "text/html;charset=UTF-8" })
        res.end(data)
      })
    } else if (req.url === "/0.jpg") {
      fs.readFile(resolve("./test/0.jpg"), function(err, data) {
        if (err) throw err
        res.writeHead(200, { "Content-type": "image/jpg" })
        res.end(data)
      })
    } else if (req.url === "/bbbbbb.css") {
      fs.readFile(resolve("./test/aaaaaa.css"), function(err, data) {
        res.writeHead(200, { "Content-type": "text/css" })
        res.end(data)
      })
    } else {
      res.writeHead(404, { "Content-type": "text/html;charset=UTF-8" })
      res.end("嘻嘻，没有这个页面呦")
    }
  })
  .listen(
    3002,
    () => {
      console.log('Server Running At 3002 !')
    })
