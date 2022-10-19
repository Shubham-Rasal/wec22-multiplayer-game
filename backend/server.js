const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const {Server} = require('socket.io');
const http = require('http');
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        }
        });



io.on("connection", (socket) => {
   console.log("New client connected");
   socket.emit('connection', null);
   
   


    socket.on("disconnect", () => console.log("Client disconnected"));

  });

server.listen(port, () => {
    console.log(`Game app listening at http://localhost:${port}`);
    }
);

