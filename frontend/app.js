const socket = io('http://localhost:3000');
 
socket.on('connection', ({msg}) => {
    // console.log(socket.connected)
    console.log(msg)
});

socket.on('gameCreated', ({gameId}) => {

    console.log(gameId);
    gameCode.innerText = gameId;
    //make the cpoy button visible
    copy.style.display = 'block';
});


const game =  document.getElementById('game');
const create = document.getElementById('create');
const gameCode = document.getElementById('gameCode');
const copy = document.getElementById('copy');
// make the game invisible
game.style.display = 'none';




//evernt listener for the create button
create.addEventListener('click', ()=>{
   socket.emit('create', {msg: 'create game'});
    
})

//event listener for the copy button
copy.addEventListener('click', ()=>{
    const text = gameCode.innerText;
    navigator.clipboard.writeText(text);
})



