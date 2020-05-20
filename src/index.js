let canvas;
let c;
let greyCanvas;
let greyImageData;


const init = function() {
  let image = document.getElementById('source-image');
  canvas = document.getElementById('canvas');
  c = canvas.getContext('2d');
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(image)
  // let image = new Image();
  // image.onload = function () {
  //   drawImage(image);
  // }
  // image.src = 'image.jpg';
  drawImage(image);
  // carve();
  getGreyScale();
  console.log(getSurroundingPixels(canvas.width-1, canvas.height-2))
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
  for (let i = 0; i < data.length; i += 4) {
    let greyVal = 0.2 * data[i] + 0.72 * data[i+1] + 0.07 * data[i+2];
    data[i] = greyVal;
    data[i+1] = greyVal;
    data[i+2] = greyVal;
  }
  c.putImageData(imageData, 0, 0);
}

const getPixelFromXY = function(x, y, imageData, defaultVal = undefined) {
  if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
    return imageData.data[(x + y * canvas.width) * 4];
  } else {
    return defaultVal;
  }
}

const getSurroundingPixels = function(x, y) {
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  let defaultVal = getPixelFromXY(x, y, imageData);
  console.log(defaultVal);

  return {
    left: getPixelFromXY(x-1, y, imageData, defaultVal),
    right: getPixelFromXY(x+1, y, imageData, defaultVal),
    up: getPixelFromXY(x, y-1, imageData, defaultVal),
    down: getPixelFromXY(x, y+1, imageData, defaultVal)
  }

}

const getGradientMagnitude = function() {
  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  let data = imageData.data;

  for (let x = 0; x < canvas.width; x++) {
    for (let y = 0; y < canvas.height; y++) {
      let pixels = getSurroundingPixels(x, y);

      let diffx = pixels.left - pixels.right;
      let diffy = pixels.up - pixels.down;
      let magnitude = Math.sqrt(diffx*diffx + diffy*diffy);
      let normalized = magnitude * 255/361;
    }
  }
}

window.addEventListener('load', init);
// document.addEventListener("DOMContentLoaded", () => {
//   let img = document.getElementById('image');

//   let canvas = document.getElementById('canvas');
//   let c = canvas.getContext('2d');


//   drawImage(image, canvas, c);
//   carve(canvas, c);
// });