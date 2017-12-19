const fs = require('fs')
const readStream = fs.createReadStream('1.mp4')
const writeStream = fs.createWriteStream('1-stream.mp4')

readStream.on('data', function(chunk) {
  if (writeStream.write(chunk) === false) {
    console.log('readstream pause')
    readStream.pause()
  }
})


readStream.on('end', function() {
  writeStream.end()
})

writeStream.on('drain', function() {
  console.log('data drains')
  readStream.resume()
})