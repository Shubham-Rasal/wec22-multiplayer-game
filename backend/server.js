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

//    socket.on('save',() => saveCanvas({canvas , gameId , socket}));
   
    socket.on('create', ({msg}) => {

        console.log(msg);
        const gameId = create(socket.id);
        console.log(games);
        socket.emit('gameCreated', {msg: 'game created',gameId: gameId });

    });

    socket.on('join', ({gameId}) => {
        console.log(gameId);
        const game = games[gameId];
        if(game){
            const {player , start} = join(socket.id, gameId);
            if(start){
                // emit start game only to the gameId room
                let game = games[gameId];
                let players = game.players;
                players.forEach((player) => {
                    io.to(player.id).emit('start', {start: start , gameId: gameId});
                });

            }
             
            socket.emit('gameJoined', {msg: 'game joined', gameId: gameId , start: start});
        }
        else{
            socket.emit('error', {msg: 'game not found'});
        }
    });

    socket.on('canvas',(data)=>saveCanvas(data , socket));

    socket.on('endGame',(data)=>endGame(data , socket));
   


    socket.on("disconnect", () => {
        console.log("Client disconnected");
        //delete the player from the game
         for(let game in games){
             let players = games[game].players;
             for(let player in players){
                 if(players[player].id === socket.id){
                     players.splice(player, 1);
                 }
             }
         }

        console.log(games);
        
    });

  });

server.listen(port, () => {
    console.log(`Game app listening at http://localhost:${port}`);
    }
);



const create = (id) => {
    //call uuid to generate a unique id withe length of 6
    const gameId = uuidv4().substring(0,6);
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
    const start = game.players.length >= 2;
    console.log(games[gameId])
    return {player: player, start: start};
}


const saveCanvas = ({canvas,gameId} , socket) => {
    // console.log(data);
    let game = games[gameId];

    let players = game.players;
    players.forEach((player) => {
        if(player.id === socket.id){
            player.canvasData = canvas;
        }
    });
    games[gameId] = game;
   
    
    game.players.forEach((player) => {
        io.to(player.id).emit('state', {game: games[gameId]});
    });
}

const endGame = ({gameId , winner} , socket) => {
    let game = games[gameId];
    let players = game.players;

    players.forEach((player) => {
        if(player.id === winner){
            game.winner = player;
        }
    });
    games[gameId] = game;
    players.forEach((player) => {
        io.to(player.id).emit('end', {game: games[gameId]});
    });
   
}