import {Server} from "socket.io"
const io=new Server(3001, {
    cors: {
        origin: "*"
    }
})

io.on("connection", socket => {
    console.log(`⚡: ${socket.id} user just connected`)
    socket.on("message", data => {
        socket.broadcast.emit("response", data)
    })
})

