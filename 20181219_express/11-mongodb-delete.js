/**
 * 创建于 2018/12/24
 * 作者: SHERlocked93
 * 功能: 使用09封装的模块
 */

const app = require("express")()
const assert = require('assert')
const { deleteMany } = require('./09-dbfetch.js')


const BASE_URL = 'mongodb://localhost:27017/'

app.get('/delete', (req, res) => {
  const id = req.query.id
  
  deleteMany(BASE_URL, 'test1', 'users', { id: parseInt(id) }, (err, result) => {
    if (err) {
      console.log('删除数据失败')
      return
    }
    res.send(result)
  })
})

app.listen(3002, () => console.log('Example app listening on http://localhost:3002/ !'))
