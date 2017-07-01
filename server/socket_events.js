exports = module.exports = function (io) {
  // Set socket.io listeners.
  io.on('connection', (socket) => {
    // On agenda entry, join broadcast channel
    socket.on('enter agenda', (user) => {
      socket.join(user);
    });

    socket.on('leave agenda', (user) => {
      socket.leave(user);
    });

    socket.on('new appointment', (user) => {
      io.sockets.in(user).emit('refresh appointments', user);
    });

    socket.on('edit appointment', (user) => {
      io.sockets.in(user).emit('refresh appointments', user);
    })

    socket.on('delete appointment', (user) => {
      io.sockets.in(user).emit('refresh appointments', user);
    })

    socket.on('disconnect', () => {
    });
  });
};
