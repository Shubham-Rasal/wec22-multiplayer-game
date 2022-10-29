const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const cors = require('cors');
const {Server} = require('socket.io');
const http = require('http');
app.use(cors());
const {v4:uuidv4 } = require('uuid');
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: '*',
        }
        });


let games = [];


io.on("connection", (socket) => {
   console.log("New client connected");
   socket.emit('connection',{msg:"Connection Established."});

   socket.on('save',() => saveCanvas)
   
    socket.on('create', ({msg}) => {

        console.log(msg);
        const gameId = create(socket.id);
        socket.emit('gameCreated', {msg: 'game created',gameId: gameId });

    });

    socket.on('join', ({gameId}) => {
        console.log(gameId);
        const game = games[gameId];
        if(game){
            const {player , start} = join(socket.id, gameId);
            if(start){
                io.emit('start', {start: true});
            }
            socket.emit('gameJoined', {msg: 'game joined', gameId: gameId , start: start});
        }
        else{
            socket.emit('error', {msg: 'game not found'});
        }
    });
   


    socket.on("disconnect", () => console.log("Client disconnected"));

  });

server.listen(port, () => {
    console.log(`Game app listening at http://localhost:${port}`);
    }
);



const create = (id) => {
    const gameId  = uuidv4();
        let game = {
            id: gameId,
            players: [],
            winner: null,
        }
        let player = {
            id: id,
            name: 'player'+game.players.length,
            canvasData: null,
        }
        game.players.push(player);
        games[gameId] = game;
        return gameId;

}

const join = (id, gameId) => {
    let game = games[gameId];
    let player = {
        id: id,
        name: 'player'+game.players.length,
        canvasData: null,
    }
    game.players.push(player);
    games[gameId] = game;
    const start = game.players.length === 2;
    return {player: player, start: start};
}