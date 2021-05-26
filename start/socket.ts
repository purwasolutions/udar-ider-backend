import Event from '@ioc:Adonis/Core/Event';
import Ws from 'App/Services/Ws';

Ws.boot()

Ws.io.use((socket, next) => {
  const uid = socket.handshake.auth.uid;
  if (!uid) {
    return next(new Error('UID Uninitialized'));
  }
  //@ts-ignore
  socket.uid = uid;

  Event.emit('PrivateMessage:onInitialize', {
    uid,
    socketId: socket.id
  })

  next();
})

Ws.io.on('connection', (socket) => {
  socket.on('PrivateMessage:sendMessage', ({ content, to }: any) => {
    Event.emit('PrivateMessage:sendMessage', {
      from: socket.id,
      to,
      content
    })
    
    socket.to(to).emit('PrivateMessage:sendMessage', {
      content,
      from: socket.id
    })

    socket.emit('PrivateMessage:receiveMessage', {
      content,
      from: socket.id
    })
  })
})