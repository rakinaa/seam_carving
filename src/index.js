let canvas;
let c;

const init = function() {
  let image = document.getElementById('source-image');
  canvas = document.getElementById('canvas');
  c = canvas.getContext('2d');
  // console.log(image)
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
  image.data = new Uint8ClampedArray();
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  console.log(imageData)
  let data = imageData.data;
  for (let i = 0; i < data.length; i++) {
    data[i] = 55;
  }
  c.putImageData(imageData, 0, 0);
}

window.addEventListener('load', init);
// document.addEventListener("DOMContentLoaded", () => {
//   let img = document.getElementById('image');

//   let canvas = document.getElementById('canvas');
//   let c = canvas.getContext('2d');


//   drawImage(image, canvas, c);
//   carve(canvas, c);
// });