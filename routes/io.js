module.exports = (io) => {
  let numUsers = 0
  io.on('connection', socket => {
    console.log('Socket.io 建立起通訊')

    let addedUser = false

    //使用者進入
    //前段要有 socket.emit
    socket.on('add user', (username) => {
      if (addedUser) return
      console.log(username)
      // console.log(socket)

      // store the username in the socket session for this client
      socket.username = username;
      ++numUsers  //在線人數
      addedUser = true

      // 前端有要 socket.on
      socket.emit('login', {
        numUsers: numUsers
      })

      // echo globally (all clients) that a person has connected
      // 前端要有 socket.on
      socket.broadcast.emit('user join public chat', {
        username: socket.username
        // numUsers: numUsers
      })
    })

    // client emits "new message", this listengs and executes
    // clinet must have socket.emit
    socket.on('new message', (data) => {
      console.log('new message: ', data)

      // we tell the client to execute 'new message'
      // client must have socket.on
      socket.broadcast.emit('new message', {
        username: socket.username,
        message: data
      })
    })

    socket.on('judy', judy => {
      console.log(judy)
    })

    // runs when client disconnects
    // client must have socket.emit
    socket.on('disconnect', () => {
      if (addedUser) {
        --numUsers;

        // echo globally that this client has left
        socket.broadcast.emit('user left', {
          username: socket.username,
          numUsers: numUsers
        })
      }
    })
  })
}