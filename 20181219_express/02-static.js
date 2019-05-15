/**
 * 创建于 2018/12/19
 * 作者: SHERlocked93
 * 功能: 静态服务
 */

const express = require('express')
const path = require('path')
const app = express()
const resolve = dir => path.resolve(__dirname, dir)

app.use('/static',express.static(resolve('./files')))

app.listen(3002, () => console.log('Example app listening on http://localhost:3002 !'))
