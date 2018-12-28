const net = require('net')

const server = net.createServer((socket) => {
  console.log(`客户端连接已建立: ${socket.remoteAddress}:${socket.remotePort}`)
  
  socket.on('data', chunk => {
    console.log(`client > ${chunk.toString()}`)
    socket.write('你说啥？')
  })
  
})

// socket.on('end', () => console.log('client disconnected'))

server.on('error', (err) => {
  throw err
})

server.listen(8124, () => {
  console.log('服务建立~')
})
