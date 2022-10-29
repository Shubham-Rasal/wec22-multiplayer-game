let canvas = document.getElementById("myCanvas");
let ctx = canvas.getContext("2d");

//set widht and height of canvas to 280x280
// canvas.width = 400;
// canvas.height = 400;

console.log("ml5 version:", ml5.version);

// canvas.style.backgroundColor = "white";
// add border to canvas
canvas.style.border = "1px solid black";
// ctx.lineWidth = 10;
// // Set stroke color to black
// ctx.strokeStyle = "#000000";




let classifier;

let request;

// A variable to hold the canvas image we want to classify
// let canvas, ctx;

// Two variable to hold the label and confidence of the result
let label;
let confidence;
let button;
const width = 280;
const height = 280;

let pX = null;
let pY = null;
let x = null;
let y = null;

let mouseDown = false;

const rect = canvas.getBoundingClientRect();

setup();
async function setup() {
//   canvas = document.querySelector("#myCanvas");
//   ctx = canvas.getContext("2d");

  classifier = await ml5.imageClassifier("DoodleNet", onModelReady);
  // classifier = await ml5.imageClassifier("MobileNet", onModelReady);
  // Create a canvas with 280 x 280 px

  canvas.addEventListener("mousemove", onMouseUpdate);
  canvas.addEventListener("mousedown", onMouseDown);
  canvas.addEventListener("mouseup", onMouseUp);

  // Create a clear canvas button
const clearBtn = document.getElementById("clear");




  clearBtn.addEventListener("click", clearCanvas);
  // Create 'label' and 'confidence' div to hold results
  label = document.getElementById("label");
  confidence = document.getElementById("confidence");

  requestAnimationFrame(draw);
}

function onModelReady() {
  console.log("ready!");
}

function clearCanvas() {
  ctx.fillStyle = "#ebedef";
  ctx.fillRect(0, 0, width, height);
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
  classifyCanvas();
}

function onMouseUpdate(e) {
  const pos = getMousePos(canvas, e);
  x = pos.x;
  y = pos.y;
}

function getMousePos(canvas, e) {
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
  confidence.innerText = `Confidence: ${results[0].confidence.toFixed(4)}`;
  // chair, sun , rain , panda , door , birthday cake , syringe
}

// const clearBtn = document.getElementById("clear");
// const submitBtn = document.getElementById("submit");
// const getBtn = document.getElementById("get");


// let painting = false;
// var coord = { x: 0, y: 0 };
// let canvasData;
// let dataURL;
// let classifier;

// function startPosition(e) {
//   painting = true;

//   draw(e);
// }

// function finishedPosition() {
//   painting = false;
//   ctx.beginPath();
// }

// const rect = canvas.getBoundingClientRect();
// function draw(event) {
//   if (!painting) return;
//   ctx.lineWidth = 10;
//   // Set stroke color to black
//   ctx.strokeStyle = "#000000";
//   ctx.lineCap = "round";
//   ctx.beginPath();
//   ctx.moveTo(
//     event.clientX - canvas.offsetLeft,
//     event.clientY - canvas.offsetTop
//   );
//   ctx.lineTo(
//     event.clientX - rect.left,
//     event.clientY - rect.top
//   );
//   ctx.stroke();
// }

// //make a div and put canvas data there
// function saveCanvas() {
//   dataURL = canvas.toDataURL();
// //   console.log(dataURL);
// }

// //paint the image with the dataurl
// function getCanvas() {
//   console.log(dataURL);
//   document.getElementById("canvasImg").src = dataURL;
// }

// function classifyCanvas() {
//   classifier.classify(document.getElementById("canvasImg"), gotResult);
// }

// function gotResult(error, results) {
//   // Display error in the console
//   if (error) {
//     console.error(error);
//   }
//   // The results are in an array ordered by confidence.
//   console.log(results[0]);
//   console.log(results[1]);
// }

// window.onload = async () => {
//   classifier = await ml5.imageClassifier("DoodleNet", () =>
//     console.log("Model is ready")
//   );
//   //  classifier = await ml5.sketchRNN("cat", () => console.log("Model is ready"));
//   console.log(classifier);
// };

// canvas.addEventListener("mousedown", startPosition);
// canvas.addEventListener("mouseup", finishedPosition);
// canvas.addEventListener("mousemove", draw);

// //clear canvas
// clearBtn.addEventListener("click", () => {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
// });

// //save canvas image
// submitBtn.addEventListener("click", () => {
//   saveCanvas();
//   // classifyCanvas();
// });
// //get canvas image
// getBtn.addEventListener("click", () => {
//   getCanvas();
//   classifyCanvas();
// });
