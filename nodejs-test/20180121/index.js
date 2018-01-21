// index.js
const express = require("express")
const app = express()
const multer = require("multer")
// 这里dest对应的值是你要将上传的文件存的文件夹
const upload = multer({ dest: './public/uploads' })
app.use(express.static('./public'))
app.post("/upload", upload.single('file'), (req, res) => {
  // req.file 是 'file' 文件的信息 （前端传递的文件类型在req.file中获取）
  // req.body 将具有文本域数据，如果存在的话  。（上面前端代码中传递的date字段在req.body中获取）
  console.log(req.body, req)                                // { date: '2018/1/20 下午5:25:56' }
  res.send('./uploads/' + req.file.filename)
})
app.listen(9999)
