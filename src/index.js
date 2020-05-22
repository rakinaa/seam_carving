let baseCanvas;
let baseCtx;
let baseImgData;

let greyCanvas;
let greyCtx;
let greyImgData;

let gradientCanvas;
let gradientCtx;
let gradientImgData;

const init = function() {
  let image = document.getElementById('source-image');

  baseCanvas = document.getElementById('base-canvas');
  baseCtx = baseCanvas.getContext('2d');
  baseCanvas.width = image.width;
  baseCanvas.height = image.height;

  greyCanvas = document.getElementById('grey-canvas');
  greyCtx = greyCanvas.getContext('2d');
  greyCanvas.width = image.width;
  greyCanvas.height = image.height;

  gradientCanvas = document.getElementById('gradient-canvas');
  gradientCtx = gradientCanvas.getContext('2d');
  gradientCanvas.width = image.width;
  gradientCanvas.height = image.height;

  drawImage(image);

  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);
  greyImgData = greyCtx.getImageData(0, 0, greyCanvas.width, greyCanvas.height);
  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);

  getGreyScale();
  console.log(getSurroundingPixels(canvas.width-1, canvas.height-2))

  // canvas = document.getElementById('canvas');
  // c = canvas.getContext('2d');
  // let imageData = c.getImageData(0, 0, canvas.width, canvas.height);
  // console.log(image)
  // let image = new Image();
  // image.onload = function () {
  //   drawImage(image);
  // }
  // image.src = 'image.jpg';
};

const drawImage = function(image) {
  baseCtx.drawImage(image, 0, 0);
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
  let data = baseImgData.data;
  for (let i = 0; i < data.length; i += 4) {
    let greyVal = 0.2 * data[i] + 0.72 * data[i+1] + 0.07 * data[i+2];
    data[i] = greyVal;
    data[i+1] = greyVal;
    data[i+2] = greyVal;
  }
  greyCtx.putImageData(baseImgData, 0, 0);
}

const getPixelFromXY = function(x, y, imageData, defaultVal = undefined) {
  if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
    return imageData.data[(x + y * canvas.width) * 4];
  } else {
    return defaultVal;
  }
}

const setPixelFromXY = function(x, y, imageData, defaultVal = undefined) {
  if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
    return imageData.data[(x + y * canvas.width) * 4];
  } else {
    return defaultVal;
  }
}

const getSurroundingPixels = function(x, y) {
  let defaultVal = getPixelFromXY(x, y, greyImgData);

  return {
    left: getPixelFromXY(x-1, y, greyImgData, defaultVal),
    right: getPixelFromXY(x+1, y, greyImgData, defaultVal),
    up: getPixelFromXY(x, y-1, greyImgData, defaultVal),
    down: getPixelFromXY(x, y+1, greyImgData, defaultVal)
  }

}


const getGradientMagnitude = function() {
  let data = greyImgData.data;

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