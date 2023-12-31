const express = require('express');
const newServer = require('http').createServer();
const io = require('socket.io')(newServer, { path: '/webrtc' });

const app = express()
const port = 8080

app.get('/', (req, res) => res.send("Hello, WebRTC!"));

const server = app.listen(port, () => {
    console.log(`WebRTC app is listening on port ${port}`)
})

io.listen(server);

const webRTCNamespace = io.of('/webRTCPeers')

webRTCNamespace.on('connection', socket => {
    console.log(socket.id)

    socket.emit('connection-success', {
        status: "connection-success",
        socketId: socket.id,
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} has disconnected`)
    })

    socket.on('sdp', data => {
        console.log(data)
        socket.broadcast.emit('sdp', data);
    })

    socket.on('candidate', data => {
        console.log(data);
        socket.broadcast.emit('candidate', data);
    })

})