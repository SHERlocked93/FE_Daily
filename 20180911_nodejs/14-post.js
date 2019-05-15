/**
 * 创建于 2018/12/18
 * 作者: SHERlocked93
 * 功能: post请求
 */

const http = require('http')
const path = require('path')
const url = require('url')
const fs = require('fs')
const util = require('util')
const querystring = require('querystring')

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
    if (req.url === '/dopost') {
      let post = ''
      
      req.on('data', c => post += c)
      
      // 在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。
      req.on('end', () => {
        post = querystring.parse(post)
        console.log(post.name)
        console.log(post.age)
        console.log(post.sex)
        console.log(util.inspect(post))
        res.end(util.inspect(post))
      })
    }
  })
  .listen(3002)
