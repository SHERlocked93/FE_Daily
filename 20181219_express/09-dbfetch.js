/**
 * 创建于 2018/12/24
 * 作者: SHERlocked93
 * 功能: DAO层
 */
const MongoClient = require('mongodb').MongoClient

/**
 * 连接数据库的某个表
 * @param url {string} 数据库的url
 * @param dbName {string} 库名
 * @param cb {function} 回调
 */
function connectDB(url, dbName, cb) {
  MongoClient.connect(url, function(err, client) {
    const db = client.db(dbName)
    cb(err, db)
    
    client.close()
  })
}

exports.insertOne = function(url, dbName, collectionName, json, callback) {
  connectDB(url, dbName, (err, db) => {
    if (err) {
      console.log('连接失败')
      return
    }
    db.collection(collectionName).insertOne(json, callback)
  })
}

exports.deleteMany = function(url, dbName, collectionName, json, callback) {
  connectDB(url, dbName, (err, db) => {
    if (err) {
      console.log('连接失败')
      return
    }
    db.collection(collectionName).deleteMany(json, callback)
  })
}
