const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


canvas.style.backgroundColor = 'lightblue';

const clearBtn = document.getElementById('clear');
const submitBtn = document.getElementById('submit');
const getBtn = document.getElementById('get');

let painting = false;
var coord = {x:0, y:0};
let canvasData;
let dataURL;

function startPosition(e) {
    painting = true;
    
    draw(e);
     
   
}

function finishedPosition() {
    painting = false;
    ctx.beginPath();
    

}

function draw(event){
    if(!painting) return;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineTo(event.clientX - canvas.offsetLeft , event.clientY - canvas.offsetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - canvas.offsetLeft ,  event.clientY - canvas.offsetTop);
    

}

//make a div and put canvas data there
function saveCanvas(){
     dataURL = canvas.toDataURL();
    console.log(dataURL);
    
}

//paint the image with the dataurl
function getCanvas(){
    console.log(dataURL);
    document.getElementById('canvasImg').src = dataURL;

}


canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', finishedPosition);
canvas.addEventListener('mousemove', draw);

//clear canvas
clearBtn.addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

//save canvas image
submitBtn.addEventListener('click', saveCanvas);
//get canvas image
getBtn.addEventListener('click', getCanvas);






// const shoot = document.getElementById('shoot')

// shoot.addEventListener('click', function(){
//     //call the shoot function
//     game.players[0].shoot();

// })
// document.addEventListener('click', function(e){
//     //call the shoot function for the player with the x and y of the click
//     const player = game.players.filter(player => e.clientX > player.x && e.clientX < player.x + player.width && e.clientY > player.y && e.clientY < player.y + player.height)[0];
    
//     if(player){
//         player.shoot(e.clientX, e.clientY);
//     }
    
    
// })




// class Game {


//     constructor(height, width, players) {
//         this.height = height;
//         this.width = width;
//         this.players = players;
//     }

//     draw(ctx,) {
//         ctx.fillStyle = 'green';
//         ctx.fillRect(0, 0, 100, 100);

//     }
//     update(ctx) {

//         this.players.forEach((player) => {

//             player.update(ctx);
//         });

//     }

// }



// class Player {
//     constructor(x, y, width, height, color) {
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.color = color;
//         this.velocity = 10;
//         this.bullets = [];

//     }
//     draw(ctx, x, y) {
//         ctx.fillStyle = this.color;
//         ctx.fillRect(x, y, this.width, this.height);
//     }
//     update(ctx) {
//         this.bullets.forEach((bullet , index) => {
//             setTimeout(() => {
//             bullet.update(ctx , index);
//             }, 100);
//         });
//         // this.x = this.x + this.velocity;
//         this.draw(ctx, this.x, this.y);
        
//     }
//     shoot(){
//         this.bullets.push(new Bullet(this.x,this.y,10,10));

//     }
// }



// class Bullet{
//     constructor(x,y,width,height,color){
//         this.x = x;
//         this.y = y;
//         this.width = width;
//         this.height = height;
//         this.color = color;
//         this.velocity = 5;
//     }
//     draw(ctx,x,y){
//         ctx.fillStyle = 'black';
//         ctx.fillRect(x,y,this.width,this.height);
//     }
//     update(ctx , index){
//         this.x = this.x + this.velocity;
//         this.draw(ctx,this.x,this.y);
//         // console.log(this.x);
//     }
// }



// let players = [];
// // const player = new Player(0,0, 100, 100, 'beige');
// //get random color
// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// }
// for (let i = 0; i < 5; i++) {
//     players.push(new Player(10, 10*i*12, 100, 100, getRandomColor()));
// }
// const game = new Game(canvas.height, canvas.width, players);


// //for lopp for 10 players

// // function animate() {
// //     requestAnimationFrame(animate);
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //     game.update(ctx);
// // }

// // animate();

// // const interval = setInterval(() => {
// //     ctx.clearRect(0, 0, canvas.width, canvas.height);
// //     game.update(ctx);
// // }, 10);