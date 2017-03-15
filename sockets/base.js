// ```
// base.js
// (c) 2015 David Newman
// david.r.niciforovic@gmail.com
// base.js may be freely distributed under the MIT license
// ```
// *base.js*
// This file contains the most basic functionality for server Socket.io
// functionality.

//TODO: set up writing to log file to be able to track ip addresses of clients
export default (io) => {

  io.sockets.on('connect', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('a user disconnected');
    });
  });

};
