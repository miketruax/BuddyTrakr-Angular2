export default (io) => {

  io.sockets.on('connect', (socket) => {
    console.log('New User Connected');

    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });

};
