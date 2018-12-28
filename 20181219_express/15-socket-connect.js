const net = require('net')

const socket = net.createConnection({ port: 8124 }, () => {
  console.log('已经连接服务端')
  process.stdin.setEncoding('utf8')
  
  process.stdin.on('data', chunk => {
    console.log('emm : ' + chunk.toString())
    
    socket.write(chunk.toString())
    process.stdout.write('\nclient > ')
    // const chunk = process.stdin.read()
    // if (chunk !== null) {
    //   process.stdout.write(`数据: ${chunk}`)
    // }
  })
  
  socket.on('data', (data) => {
    console.log(`服务端回复 > ${data.toString()}`)
  })
})

process.stdin.on('end', () => {
  process.stdout.write('结束')
})

socket.on('end', () => {
  console.log('disconnected from server')
})

