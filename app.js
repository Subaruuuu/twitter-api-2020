if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()
const http = require('http')
const socketServer = http.createServer(app)
// const socket = require('socket.io')
const port = process.env.PORT || 3000
const io = require("socket.io")(socketServer, {
  cors: {
    origin: "http://localhost:8080",
    methods: ["GET", "POST"]
  }
})

app.use(express.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/upload', express.static(__dirname + '/upload'))
// app.use(express.static(path.join(__dirname, 'public')))
app.use(cors())

const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('./config/swagger.json')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

app.get('/', (req, res) => res.send('請使用API接口'))

socketServer.listen(port, () => console.log(`Socket.io server listening on port ${port}`))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))

require('./routes')(app)
require('./routes/io')(io)

module.exports = app
