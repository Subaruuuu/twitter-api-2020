const sequelize = require('sequelize')
const db = require('../models')
const { Followship, User } = db
let onlineUserList = []


module.exports = (io) => {
  io.on('connection', socket => {
    console.log('Socket.io 建立起通訊')
    let userAccount

    socket.on('add user', (user) => {
      console.log(user)

      socket.user = user
      userAccount = user.account

      const list = onlineUserList.map(user => user.account)
      if (list.indexOf(user.account) === -1) {
        onlineUserList.push(user)
      }


      socket.broadcast.emit('user join public chat', {
        user: user,
        onlineUserList: onlineUserList
      })
    })

    socket.on('reconnect', (user) => {
      console.log('reconnect: ', user)

      const list = onlineUserList.map(user => user.account)
      if (list.indexOf(user.account) === -1) {
        onlineUserList.push(user)
      }

      socket.broadcast.emit('user reconnect', {
        user: user,
        onlineUserList: onlineUserList
      })
    })

    socket.on('new message', (data) => {
      console.log('new message: ', data)

      socket.broadcast.emit('new message', {
        id: data.id,
        message: data.message,
        avatar: data.avatar
      })
    })

    socket.on('disconnect', (reason) => {
      console.log('disconnect: ', reason)
      // console.log(socket)

      const list = onlineUserList.map(user => user.account)
      if (list.indexOf(userAccount) >= 0) {
        onlineUserList.splice(list.indexOf(userAccount), 1)
      }

      socket.broadcast.emit('user left', {
        user: socket.user
      })

    })
  })
}