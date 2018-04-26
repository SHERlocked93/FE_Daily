const path = require('path')
const app = require('express')()
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.get('/', function(req, res) {
  res.sendFile(path.resolve(__dirname, 'chatDemo1.html'))
})

io.on('connection', function(socket) {
  console.info('a user connected')
  socket.on('chat message', function(msg) {
    console.log(`chat message: ${msg}`)
  })
  
  socket.emit('chat message', function(msg) {
    let i = 0
    setInterval(() => console.log(`chat message~: ${i++}`), 5000)
  })
})

http.listen(3000, function() {
  console.log('listening on *:3000')
})
