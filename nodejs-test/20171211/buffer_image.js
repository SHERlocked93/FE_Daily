const fs = require('fs')

fs.readFile('D:\\图片\\11.jpg', function(err, origin_buffer) {
  console.log(Buffer.isBuffer(origin_buffer))
  
  
  fs.writeFile('logo.png', origin_buffer, function(err) {
    if (err) {console.log(err)}
  })
  
  let base64Image = origin_buffer.toString('base64')
  console.log(base64Image)
  
  let decodedImage = new Buffer(base64Image, 'base64')
  
  console.log(Buffer.compare(decodedImage, origin_buffer))
  
  fs.writeFile('logo.png', decodedImage, function(err) {
    if (err) {console.log(err)}
  })
})