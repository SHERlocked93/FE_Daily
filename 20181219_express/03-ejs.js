/**
 * 创建于 2018/12/19
 * 作者: SHERlocked93
 * 功能: express + ejs
 */

const path = require('path')
const app = require("express")()
const resolve = dir => path.resolve(__dirname, dir)

app.set('view engine', 'ejs')

app.get('/', (req, res) => {
  res.render(
    resolve('./views/haha.ejs'),
    { news: ['我是小新闻啊', '我也是啊', '哈哈哈'] }
  )
})

app.listen(3002, () => console.log('Example app listening on http://localhost:3002 !'))
