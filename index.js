var app = require('express')()
var http = require('http').Server(app)
var io = require('socket.io')(http)

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

io.on('connection', function (socket) {
  socket.broadcast.emit('chat message', 'A user connect to the room')
  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })
  socket.on('disconnect', function () {
    io.emit('chat message', 'A user left the room')
  })
})

http.listen(3000, function () {
  console.log('listening on *:3000')
})
