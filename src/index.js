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
  // carve();
  getGreyScale();
};

const drawImage = function(image) {
  canvas.width = image.width;
  canvas.height = image.height;
  c.drawImage(image, 0, 0);
};




const carve = function() {
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    data[i] = 55;
  }
  c.putImageData(imageData, 0, 0);
}

const getGreyScale = function() {
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;
  let greyVal = 0.2 * data[i] + 0.72 * data[i+1] + 0.07 * data[i+2] 
  for (let i = 0; i < data.length; i += 4) {
    data[i] = greyVal;
    data[i+1] = greyVal;
    data[i+2] = greyVal;
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