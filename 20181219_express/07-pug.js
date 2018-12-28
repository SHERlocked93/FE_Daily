/**
 * 创建于 2018/12/20
 * 作者: SHERlocked93
 * 功能: get请求被自动parse了
 */


const path = require('path')
const app = require("express")()
const bodyParser = require('body-parser')

const resolve = dir => path.resolve(__dirname, dir)
const obj2json = obj => JSON.stringify(obj, null, 2)

app.engine('pug', require('pug').__express)

app.get('/', (req, res) => {
  console.log(req.hostname, req.ip)
  res.render(resolve('./views/xixi.pug'))
})

app.listen(3002, () => console.log('Example app listening on http://localhost:3002/ !'))
