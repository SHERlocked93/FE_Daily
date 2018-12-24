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

const jsonParser = bodyParser.json()
const urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(jsonParser)
app.use(urlencodedParser)

app.set('view engine', 'ejs')

app.post('/dopost', (req, res) => {
  if (!req.body) return res.sendStatus(400)
  res.writeHead(200, { 'Content-Type': 'text/html;charset=UTF8' })
  console.log(obj2json(req.body))
  res.end(`欢迎${req.body.sex === '男' ? '帅哥' : '美女'} ${req.body.name}, age: ${req.body.age}`)
})

app.listen(3002, () => console.log('Example app listening on port 3002!'))
