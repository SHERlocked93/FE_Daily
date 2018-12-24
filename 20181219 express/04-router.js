/**
 * 创建于 2018/12/20
 * 作者: SHERlocked93
 * 功能: 路由中间件的顺序
 */


const path = require('path')
const app = require("express")()
const resolve = dir => path.resolve(__dirname, dir)

app.get('/admin/login', (req, res) => {
  console.log(2)
  res.end('进入/admin/login')
})

app.get('/:username/:id', (req, res) => {
  console.log(1)
  res.end(`用户信息 username: ${req.params.username}  id: ${req.params.id}`)
})

app.listen(3002, () => console.log('Example app listening on port 3002!'))
