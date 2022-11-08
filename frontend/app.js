const socket = io("https://multiplayer-game-backend.onrender.com/ ");

const game = document.getElementById("game");
const create = document.getElementById("create");
const gameCode = document.getElementById("gameCode");
const copy = document.getElementById("copy");
const join = document.getElementById("join");
const joinGame = document.getElementById("joinCode");
const connect = document.getElementById("connect");
const gc = document.getElementById("gc");
const doodles = document.getElementById("doodles");

let gameId = 123;
let player = null;

socket.on("connection", ({ msg }) => {
  // console.log(socket.connected)
  console.log(msg);
});

socket.on("gameCreated", ({ gameId }) => {
  console.log(gameId);
  gameId = gameId;
  gameCode.innerText = gameId;
  game.style.display = "block";
  //make the cpoy button visible
  copy.style.display = "block";
});

socket.on("gameJoined", ({ gameId, start }) => {
  console.log(gameId, start);
  gameId = gameId;
});

socket.on("start", ({ start, gameId }) => {
  console.log({ start, gameId });
  gameId = gameId;
  gc.innerText = gameId;
  if (start) {
    connect.style.display = "none";
    game.style.display = "flex";
  }
});

socket.on("state", ({ game }) => {
  console.log(game);
  doodles.innerHTML = "";
  // make an image tag and append it to the doodles div
  let { players } = game;
  players.forEach((player) => {
    if (player.canvasData) {
      let img = document.createElement("img");
      img.src = player.canvasData;
      doodles.appendChild(img);
    }
  });
});

//end game
socket.on("end", ({ game }) => {
  console.log(game);
  let { winner } = game;
  if (winner) {
    alert(`Game Over! ${winner.name} won!`);
  } else alert(`Game Over! It's a draw!`);
  setTimeout(() => {
    location.reload();
  }, 500);
  connect.style.display = "flex";
  game.style.display = "none";
});

socket.on("error", ({ msg }) => {
  console.log(msg);
});

// make the game invisible
game.style.display = "none";

//evernt listener for the create button
create.addEventListener("click", () => {
  socket.emit("create", { msg: "create game" });
});

//event listener for the copy button
copy.addEventListener("click", () => {
  const text = gameCode.innerText;
  navigator.clipboard.writeText(text);
});

//event listener for the join button
join.addEventListener("click", () => {
  const gameId = joinGame.value;
  socket.emit("join", { gameId: gameId });
});
