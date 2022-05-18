const io = require('socket.io')(9000, {
    cors: {
        origin: "http://localhost:3000"
    }
})

let users = []

const addUser = (userId, socketId) => {
    const exist = users.some(user => user.userId === userId)

    if (!exist) {
        users.push({
            userId, 
            socketId,
        })
    }
}

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId)
}

const getUser = (userId) => {
    return users.find(user => user.userId === userId)
}

io.on('connection', (socket) => {

    // when connected
    socket.on('addUser', userId => {
        addUser(userId, socket.id)
        io.emit('getUsers', users)
    })  
    
    // when disconnected
    socket.on('disconnect', () => {
        removeUser(socket.id)
        io.emit('getUsers', users)
    })

    // send in get message
    socket.on('sendMessage', ({userId, receiverId, text}) => {
        const user = getUser(receiverId)
        io.to(user.socketId).emit('getMessage', {
            sender: userId,
            text,
        })
    })
})