/**
 * 创建于 2018/12/19
 * 作者: SHERlocked93
 * 功能: hello world
 */

const express = require('express')
const app = express()

app.get('/', (req, res) => res.send('Hello World!~~~'))

app.get('/users/:userId/books/:bookId', function(req, res) {
  res.send(req.params)
})

app.listen(3002, () => console.log('Example app listening on http://localhost:3002 !'))
