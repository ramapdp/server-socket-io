const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');


const app = express();
const port = process.env.PORT || 3000;

const server = http.createServer(app);
app.use(cors());

app.get('/', (req, res) => {
   res.send("Socket.io server is running on port " + port);
});

const io = new Server(server, {
   cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST']
   }
});

io.on('connection', (socket) => {
   console.log('A user connected');

   socket.on('message', (message) => {
       console.log('Message Received:', message);
      // send message to all clients
       io.emit('message', message);
   });

   socket.on('disconnect', () => {
       console.log('User disconnected');
   });
});

server.listen(port, () => {
   console.log(`Server is running on port ${port}`);
});
