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
  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);
  
  getGreyScale();
  console.log(greyCanvas.width-1);
  console.log(getSurroundingPixels(greyCanvas.width-1, greyCanvas.height-2))
  getGradientMagnitude();

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
  greyImgData = greyCtx.getImageData(0, 0, greyCanvas.width, greyCanvas.height);
  let baseData = baseImgData.data;
  let greyData = greyImgData.data;
  for (let i = 0; i < baseData.length; i += 4) {
    let greyVal = 0.2 * baseData[i] + 0.72 * baseData[i+1] + 0.07 * baseData[i+2];
    // let greyVal = (baseData[i] + baseData[i+1] + baseData[i+2]) / 3;
    greyData[i] = greyVal;
    greyData[i+1] = greyVal;
    greyData[i+2] = greyVal;
    greyData[i+3] = baseData[i+3];
  }
  greyCtx.putImageData(greyImgData, 0, 0);
}

const getPixelFromXY = function(x, y, imageData, defaultVal = undefined) {
  if (x >= 0 && x < greyCanvas.width && y >= 0 && y < greyCanvas.height) {
    return imageData.data[(x + y * greyCanvas.width) * 4];
  } else {
    return defaultVal;
  }
}

const setPixelFromXY = function(x, y, data, val) {
  if (x >= 0 && x < greyCanvas.width && y >= 0 && y < greyCanvas.height) {
    const i = (x + y * greyCanvas.width) * 4;
    data[i] = val;
    data[i+1] = val;
    data[i+2] = val;
    data[i+3] = greyImgData.data[i+3];
    return true;
  } else {
    return false;
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
  let gradData = gradientImgData.data;

  for (let x = 0; x < greyCanvas.width; x++) {
    for (let y = 0; y < greyCanvas.height; y++) {
      let pixels = getSurroundingPixels(x, y);
      
      let diffx = pixels.left - pixels.right;
      let diffy = pixels.up - pixels.down;
      let magnitude = Math.sqrt(diffx*diffx + diffy*diffy);
      let normalized = Math.floor(magnitude * 255/361);
      setPixelFromXY(x, y, gradData, normalized);
    }
  }
  gradientCtx.putImageData(gradientImgData, 0, 0);
}

const getMinEnergyFromXY = function(x, y, matrix) {
  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);
  const aboveRow = [
    matrix[x-1][y-1],
    matrix[x][y-1],
    matrix[x+1][y-1],
  ].filter((el) => el !== undefined);
  return aboveRow.length > 0 ? Math.min(...aboveRow) : 0;
}

const getEnergyMatrix = function() {
  let energyMatrix = [...Array(baseCanvas.height)].map(e => Array(baseCanvas.width));
}
window.addEventListener('load', init);
// document.addEventListener("DOMContentLoaded", () => {
//   let img = document.getElementById('image');

//   let canvas = document.getElementById('canvas');
//   let c = canvas.getContext('2d');


//   drawImage(image, canvas, c);
//   carve(canvas, c);
// });