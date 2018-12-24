const app = require("express")()
const MongoClient = require('mongodb').MongoClient
const assert = require('assert')

const BASE_URL = 'mongodb://localhost:27017/'

app.get('/', (req, res) => {
  // 连接mongoDB
  MongoClient.connect(BASE_URL, function(err, client) {
    console.log("数据库连接成功")
    
    // 链接数据库
    const db = client.db('test1')
    db.collection('users').insertOne({ name: 'chichi' }, (err, result) => {
      if (err) throw err
      console.log(result)
      res.send('插入数据成功')
    })
    
    client.close()
  })
})

app.listen(3002, () => console.log('Example app listening on http://localhost:3002/ !'))
