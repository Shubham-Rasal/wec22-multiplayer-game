const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.backgroundColor = 'lightblue';


class Game {


    constructor(height, width, players) {
        this.height = height;
        this.width = width;
        this.players = players;
    }

    draw(ctx,) {
        ctx.fillStyle = 'green';
        ctx.fillRect(0, 0, 100, 100);

    }
    update(ctx) {

        this.players.forEach((player) => {

            player.update(ctx);
        });

    }

}
class Player {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = 10;

    }
    draw(ctx, x, y) {
        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, this.width, this.height);
    }
    update(ctx) {
        this.x = this.x + this.velocity;
        this.draw(ctx, this.x, this.y);
        console.log(this.x);
    }
}


let players = [];
// const player = new Player(0,0, 100, 100, 'beige');
//get random color
function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
for (let i = 0; i < 10; i++) {
    players.push(new Player(10, 10, 100, 100, getRandomColor()));
}
const game = new Game(canvas.height, canvas.width, players);


//for lopp for 10 players

// function animate() {
//     requestAnimationFrame(animate);
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     game.update(ctx);
// }

// animate();

// const interval = setInterval(() => {
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     game.update(ctx);
// }, 1000);



