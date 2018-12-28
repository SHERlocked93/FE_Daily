/**
 * 创建于 2018/12/24
 * 作者: SHERlocked93
 * 功能: 连接并操作mongoDB
 */


const app = require("express")()
const assert = require('assert')

const BASE_URL = 'mongodb://localhost:27017/'

app.get('/', (req, res) => {
  // 连接mongoDB
  MongoClient.connect(BASE_URL, function(err, client) {
    console.log("数据库连接成功")
    
    // 链接数据库
    const db = client.db('test1')
    db.collection('users').insertOne({ name: '么西' }, (err, result) => {
      if (err) throw err
      console.log(result)
      res.send(result)
    })
    
    client.close()
  })
})

app.listen(3002, () => console.log('Example app listening on http://localhost:3002/ !'))
