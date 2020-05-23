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
  getSeam();
  // let s = new Set();
  // s.add([1,2].toString())
  // console.log([1,2].toString())
  // console.log(s.has([1,2].toString()));
  

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
    data[i] = val.r === undefined ? val : val.r;
    data[i+1] = val.g === undefined ? val : val.g;
    data[i+2] = val.b === undefined ? val : val.b;
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


const getCoords = function(x, y, matrix) {
  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {
    return matrix[y][x];
  } else {
    return undefined
  }
}
const getMinEnergyFromXY = function(x, y, matrix) {
  const aboveRow = [
    getCoords(x-1, y-1, matrix),
    getCoords(x, y-1, matrix),
    getCoords(x+1, y-1, matrix)
  ].filter((el) => el !== undefined);
  return aboveRow.length > 0 ? Math.min(...aboveRow) : 0;
}

const getEnergyMatrix = function() {
  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);
  let energyMatrix = [...Array(baseCanvas.height)].map(e => Array(baseCanvas.width));

  for (let y = 0; y < baseCanvas.height; y++) {
    for (let x = 0; x < baseCanvas.width; x++) {
      const currVal = getPixelFromXY(x, y, gradientImgData);
      const minEnergy = getMinEnergyFromXY(x, y, energyMatrix);
      energyMatrix[y][x] = currVal + minEnergy;
    }
  }

  return energyMatrix;
}

const getSeam = function() {
  let energyMatrix = getEnergyMatrix();
  let seamx = 0
  let seamy = baseCanvas.height-1;
  let minVal = energyMatrix[seamy][0];

  for (let i = 1; i < baseCanvas.width; i++) {
    if (minVal > energyMatrix[seamy][i]) {
      seamx = i;
      minVal = energyMatrix[seamy][i];
    }
  }

  // console.log(minVal)
  // console.log(energyMatrix[seamy][9])
  // console.log(energyMatrix[1][0]);
  // console.log(energyMatrix[1][1]);
  // console.log(energyMatrix[2][0]);
  // console.log(energyMatrix[0].slice(0,7));
  // console.log(energyMatrix[1].slice(0,7));
  // console.log(energyMatrix[2].slice(0,7));
  // console.log(energyMatrix[seamy].slice(0,7));
  // console.log(getPixelFromXY(0,3,gradientImgData));
  let seamSet = new Set();

  let baseData = baseImgData.data;
  while (seamy >= 0) {
    setPixelFromXY(seamx, seamy, baseData, {r: 255, g: 0, b: 0});
    seamSet.add([seamy, seamx].toString())

    if (seamy === 0) { break; }

    minVal = energyMatrix[seamy][seamx];
    let left = energyMatrix[seamy-1][seamx-1]
    let right = energyMatrix[seamy-1][seamx+1]
    
    if (left !== undefined && left < minVal) {
      seamx = seamx-1;
      minVal = left;
    } else if (right !== undefined && right < minVal) {
      seamx = seamx+1;
      minVal = right;
    }
    seamy--;
  }
  baseCtx.putImageData(baseImgData, 0, 0);

  return seamSet;
}

const getSeam = function() {

}

window.addEventListener('load', init);
// document.addEventListener("DOMContentLoaded", () => {
//   let img = document.getElementById('image');

//   let canvas = document.getElementById('canvas');
//   let c = canvas.getContext('2d');


//   drawImage(image, canvas, c);
//   carve(canvas, c);
// });