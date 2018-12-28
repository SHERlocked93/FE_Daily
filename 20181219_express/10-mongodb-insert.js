/**
 * 创建于 2018/12/24
 * 作者: SHERlocked93
 * 功能: 使用09封装的模块
 */

const app = require("express")()
const assert = require('assert')
const { insertOne } = require('./09-dbfetch.js')


const BASE_URL = 'mongodb://localhost:27017/'

app.get('/dopost', (req, res) => {
  insertOne(BASE_URL, 'test1', 'users', req.query, (err, result) => {
    if (err) {
      console.log('插入数据失败')
      return
    }
    res.send(req.query)
  })
})

app.listen(3002, () => console.log('Example app listening on http://localhost:3002/ !'))
