const socket = io('http://localhost:3000');
 

const game =  document.getElementById('game');
const create = document.getElementById('create');
const gameCode = document.getElementById('gameCode');
const copy = document.getElementById('copy');
const join = document.getElementById('join');
const joinGame = document.getElementById('joinCode');
const connect = document.getElementById('connect');

let gameId = null;
let player = null;

socket.on('connection', ({msg}) => {
    // console.log(socket.connected)
    console.log(msg)
});

socket.on('gameCreated', ({gameId}) => {

    console.log(gameId);
    gameId = gameId;
    gameCode.innerText = gameId;
    //make the cpoy button visible
    copy.style.display = 'block';
});

socket.on('gameJoined', ({gameId, start}) => {
    console.log(gameId, start);
    gameId = gameId;
    
});

socket.on('start', ({start}) => {
    console.log(start);
     if(start){
        connect.style.display = 'none';
        game.style.display = 'block';
     }
    
});


socket.on('error', ({msg}) => {
    console.log(msg);
});





// make the game invisible
// game.style.display = 'none';




//evernt listener for the create button
create.addEventListener('click', ()=>{
   socket.emit('create', {msg: 'create game'});
    
})

//event listener for the copy button
copy.addEventListener('click', ()=>{
    const text = gameCode.innerText;
    navigator.clipboard.writeText(text);
})

//event listener for the join button
join.addEventListener('click', ()=>{
    const gameId = joinGame.value;
    socket.emit('join', {gameId: gameId});
})



