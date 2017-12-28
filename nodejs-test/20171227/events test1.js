const http = require('http')

const options = {
  host: 'www.google.com',
  port: 80,
  path: '/upload',
  method: 'post'
}

const req = http.request(options, function(res) {
  console.log('RES: ' + res)
  console.log('STATUS: ' + res.statusCode)
  console.log('HEADERS: ' + JSON.stringify(res.headers))
  
  res.setEncoding('utf8')
  res.on('data', function(chunk) {
    console.log('BODY: ' + chunk)
  })
  
  res.on('end', function() {
    console.log('END啦！')
  })
  
  res.on('error', function(err) {
    console.log('err啦！  ' + err)
  })
})

req.write('data\n')
req.write('data\n')
req.end()