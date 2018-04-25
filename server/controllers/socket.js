const listen = (app, socket, queue) => {
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

    for(let u in queue) {
      queue[u] = true
    }
    queue[originMsg.editor] = false
    originMsg.queue = queue
    app._io.emit('chat message', JSON.stringify(originMsg))
  })
}

export default {
  listen
}
