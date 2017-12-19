const fs = require('fs')
const readStream = fs.createReadStream('1.mp4')
const writeStream = fs.createWriteStream('1-stream.mp4')

readStream.pipe(writeStream)

// pipe牛逼！