const listen = socket => {
  socket.on('join', function(uid) {
    if (queue[uid] === true) {
      console.log(`${uid} reconnected`)
    } else {
      queue[uid] = true
      console.log(`${uid} joined at ${Date.now()}`)
    }
  })

  socket.on('leave', function(uid) {
    queue[uid] = false
    console.log(`${uid} leaved at ${Date.now()}`)
  })

  socket.on('chat message', function(msg) {
    var originMsg = JSON.parse(msg)
    originMsg.queue = queue
    // console.log(new Date() + ": " + msg)
    app._io.emit('chat message', JSON.stringify(originMsg))

    // var notification = {}

    // app._io.emit('notification', JSON.stringify(notification))
  })
}

export default {
  listen
}
