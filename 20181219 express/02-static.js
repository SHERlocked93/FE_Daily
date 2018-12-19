/**
 * 创建于 2018/12/19
 * 作者: SHERlocked93
 * 功能: 静态服务
 */

const express = require("express")
const app = express()

app.use(express.static("./public"))

app.get("/haha", function(req, res) {
  res.send("haha ")
})


app.listen(3002, () => console.log('Example app listening on port 3002!'))
