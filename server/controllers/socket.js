const listen = (app, socket, queue) => {
  socket.on('join', function(uid) {
    if (queue[uid] === true) {
      console.log(`${uid} reconnected`)
    } else {
      queue[uid] = true
      console.log(`${uid} joined at ${Date.now()}`)
    }
    app._io.emit('queue', JSON.stringify(queue))
  })

  socket.on('leave', function(uid) {
    delete queue[uid]
    console.log(`${uid} leaved at ${Date.now()}`)
    app._io.emit('queue', JSON.stringify(queue))
  })

  socket.on('message', function(msg) {
    var originMsg = JSON.parse(msg)

    for(let u in queue) {
      queue[u] = true
    }
    queue[originMsg.editor] = false
    originMsg.queue = queue
    app._io.emit('message', JSON.stringify(originMsg))
  })
}

export default {
  listen
}
