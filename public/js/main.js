const socket = io()

// 接受後端的 message event 的 emit
socket.on('message', message => {
  console.log(message)
})

