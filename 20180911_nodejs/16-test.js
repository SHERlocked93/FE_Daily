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

let i = 1

http
  .createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
    
    res.end((i++).toString())
  })
  .listen(3002)
