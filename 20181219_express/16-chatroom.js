const net = require('net')

const server = net.createServer((socket) => {
  socket.on('data', chunk => {
    try {
      const signal = JSON.parse(chunk.toString().trim())
      // const { username, procotol, message } = signal
      switch (procotol) {
        case 'broadcast':
          console.log('广播')
          break
        case 'p2p':
          console.log('单点聊天')
          break
        default:
          socket.write('同性模式错误')
          break
      }
      
    } catch (e) {
      socket.write('格式错误')
    }
  })
})


server.listen(8124, () => {
  console.log('服务建立~')
})

