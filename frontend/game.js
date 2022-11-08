let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

console.log("ml5 version:", ml5.version);

canvas.style.border = "1px solid black";

let classifier;
let request;

// Two variable to hold the label and confidence of the result
let label;
let confidence;
let button;
let gcode;
let what_to_draw;
let points;
let point = 0;
const width = 280;
const height = 280;

let pX = null;
let pY = null;
let x = null;
let y = null;

let mouseDown = false;

const labels = [
  "chair",
  "sun",
  "rain",
  "panda",
  "door",
  "birthday_cake",
  "syringe",
  "lipstick",
];

setup();
async function setup() {
  classifier = await ml5.imageClassifier("DoodleNet", onModelReady);

  canvas.addEventListener("mousemove", onMouseUpdate);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);

  // Create a clear canvas button
  const clearBtn = document.getElementById("clear");

  clearBtn.addEventListener("click", clearCanvas);
  // Create 'label' and 'confidence' div to hold results
  label = document.getElementById("label");
  confidence = document.getElementById("confidence");
  gcode = document.getElementById("gc");
  what_to_draw = document.getElementById("what-to-draw");
  points = document.getElementById("points");

  // add the first label
  what_to_draw.innerText = `Draw a  ${labels[0]}`;
  

  requestAnimationFrame(draw);
}

function onModelReady() {
  console.log(" ✅ Model is ready to classify!");
}

function clearCanvas() {
  ctx.fillStyle = "#ebedef";
  ctx.fillRect(0, 0, width, height);
  console.log("game id is ", gcode.innerText);
}

function draw() {
  request = requestAnimationFrame(draw);

  if (pX == null || pY == null) {
    ctx.beginPath();
    ctx.fillStyle = "#ebedef";
    ctx.fillRect(0, 0, width, height);

    pX = x;
    pY = y;
  }

  // Set stroke weight to 10
  ctx.lineWidth = 12;
  // Set stroke color to black
  ctx.strokeStyle = "#000000";
  // If mouse is pressed, draw line between previous and current mouse positions
  if (mouseDown === true) {
    ctx.beginPath();
    ctx.lineCap = "round";
    ctx.moveTo(x, y);
    ctx.lineTo(pX, pY);
    ctx.stroke();
  }

  pX = x;
  pY = y;
}

function onMouseDown(e) {
  mouseDown = true;
}

function onMouseUp(e) {
  mouseDown = false;
  // classifyCanvas();
}

function onMouseUpdate(e) {
  const pos = getMousePos(canvas, e);
  x = pos.x;
  y = pos.y;
}

function getMousePos(canvas, e) {
  const rect = canvas.getBoundingClientRect();

  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top,
  };
}

function classifyCanvas() {
  classifier.classify(canvas, gotResult);
}

// A function to run when we get any errors and the results
function gotResult(error, results) {
  // Display error in the console
  if (error) {
    console.error(error);
  }
  // The results are in an array ordered by confidence.
  console.log(results);
  // Show the first label and confidence
  label.innerText = `Label: ${results[0].label}`;
  confidence.innerText = `Confidence: ${results[0].confidence.toFixed(4) * 100}%`;
  //check if the label is the same as the one we want to draw
  if (results[0].label === labels[0]) {
    //if it is, then we can clear the canvas
    clearCanvas();
    //and remove the first label from the array
    labels.shift();
    //and add the next label
    what_to_draw.innerText = `Draw: ${labels[0]}`;
    //add a point
    point++;
    points.innerText = `Points: ${point}`;
    // if there are no more labels, then we can end the game
    if (labels.length === 0) {
      //end the game
      endGame();
    }
  }
  // chair, sun , rain , panda , door , birthday cake , syringe , lipstick
}

// const clearBtn = document.getElementById("clear");
const submitBtn = document.getElementById("submit");

// //make a div and put canvas data there
function saveCanvas() {
  dataURL = canvas.toDataURL();
  // console.log(dataURL);
  socket.emit("canvas", { canvas: dataURL, gameId: gcode.innerText });
}


// //save canvas image
submitBtn.addEventListener("click", () => {
  saveCanvas();
  classifyCanvas();
});


//end game
function endGame() {
  //stop the animation
  cancelAnimationFrame(request);
  //clear the canvas
  clearCanvas();
  //remove the event listener
  canvas.removeEventListener("mousemove", onMouseUpdate);
  canvas.removeEventListener("mousedown", onMouseDown);
  canvas.removeEventListener("mouseup", onMouseUp);
  //remove the button
  submitBtn.remove();
  //remove the label
  what_to_draw.remove();
  //remove the points
  points.remove();
  //show the end game message
  // label.innerText = `Game over! You got ${point} points`;
  canvas.remove();
  game.remove();
  //emit the end game event
  socket.emit("endGame", { gameId: gcode.innerText , winner : socket.id});
  //reload the page
  setTimeout(() => {
    location.reload();
  }, 500);
}