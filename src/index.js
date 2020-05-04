let canvas;
let c;

const init = function() {
  let image = document.getElementById('source-image');
  console.log(image.height);
  canvas = document.getElementById('canvas');
  c = canvas.getContext('2d');
  // let image = new Image();
  // image.onload = function () {
  //   drawImage(image);
  // }
  // image.src = 'image.jpg';
  drawImage(image);
  // carve(canvas, c);
};

const drawImage = function(image) {
  console.log(image.height);
  canvas.width = image.width;
  canvas.height = image.height;
  c.drawImage(image, 0, 0);
};




const carve = function(canvas, c) {
  console.log(canvas.width);
  console.log(canvas.height);
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i++) {
    data[i] = 255;
  }
  c.putImageData(imageData, 0, 0);
}

// window.addEventListener('load', init);
document.addEventListener("DOMContentLoaded", init)
// document.addEventListener("DOMContentLoaded", () => {
//   let img = document.getElementById('image');
//   console.log(image.height);

//   let canvas = document.getElementById('canvas');
//   let c = canvas.getContext('2d');


//   drawImage(image, canvas, c);
//   carve(canvas, c);
// });