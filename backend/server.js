const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
  }
});
const boards = {};

console.log('Server is starting...');

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('join', (boardId) => {
    console.log(`Client joined board: ${boardId}`);
    socket.join(boardId);

    if (!boards[boardId]) {
      boards[boardId] = [];
    }

    socket.emit('load', boards[boardId]);

    socket.on('drawing', (data) => {
      console.log(`Drawing received: ${JSON.stringify(data)}`);
      boards[boardId].push(data);
      socket.to(boardId).emit('drawing', data);
    });

    socket.on('clear', () => {
      boards[boardId] = [];
      socket.to(boardId).emit('clear');
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
