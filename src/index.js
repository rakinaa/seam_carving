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
  carve();
};

const drawImage = function(image) {
  canvas.width = image.width;
  canvas.height = image.height;
  c.drawImage(image, 0, 0);
};




const carve = function() {
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i++) {
    data[i] = 55;
  }
  c.putImageData(imageData, 0, 0);
}

window.addEventListener('load', init);
// document.addEventListener("DOMContentLoaded", () => {
//   let img = document.getElementById('image');
//   console.log(image.height);

//   let canvas = document.getElementById('canvas');
//   let c = canvas.getContext('2d');


//   drawImage(image, canvas, c);
//   carve(canvas, c);
// });