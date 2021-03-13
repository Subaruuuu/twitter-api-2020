module.exports = (io) => {
  io.on('connection', socket => {
    console.log('Socket.io 建立起通訊')

    socket.emit('message', 'THIS IS TEST MESSAGE')

    socket.broadcast.emit('message', 'A user has join the chat')

    socket.on('judy', judy => {
      console.log(judy)
    })

    // runs when client disconnects
    // 使用者離開後，針對頻道內所有人發出的離線訊息
    socket.on('disconnect', () => {
      io.emit('message', 'A user has left the chat')
    })
  })
}