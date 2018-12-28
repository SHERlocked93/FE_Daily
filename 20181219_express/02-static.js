/**
 * 创建于 2018/12/19
 * 作者: SHERlocked93
 * 功能: 静态服务
 */

const express = require("express")
const path = require('path')
const app = express()
const resolve = dir => path.resolve(__dirname, dir)

app.use(express.static(resolve("./public")))

app.listen(3002, () => console.log('Example app listening on port 3002!'))
