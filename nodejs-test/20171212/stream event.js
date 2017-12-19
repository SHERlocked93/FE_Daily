const fs = require('fs')
let n = 0

let readStream = fs.createReadStream('stream event.js')
readStream
    .on('data', function(chunk) {
      n++
      console.log(Buffer.isBuffer(chunk))
      console.log('data :', chunk.toString('utf8'))
      readStream.pause()
      console.log('data pause')
      setTimeout(function() {
        console.log('data pause end')
        readStream.resume()
      }, 1000)
    })
    .on('readable', function(readable) {
      console.log('data readable:', readable)
    })
    .on('end', function() {
      console.log('ends n=', n)
    })
    .on('close', function() {
      console.log('close')
    })
    .on('error', function() {
      console.log('error')
    })