/**
 * 创建于 2018/12/20
 * 作者: SHERlocked93
 * 功能: get请求被自动parse了
 */


const path = require('path')
const app = require("express")()
const resolve = dir => path.resolve(__dirname, dir)

app.get('', (req, res) => {
  console.log(req.query)
  res.end('进入/admin/login')
})

app.listen(3002, () => console.log('Example app listening on port 3002!'))
