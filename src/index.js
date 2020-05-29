let image;

let baseCanvas;
let baseCtx;
let baseImgData;
let baseDataCopy = [];

let greyCanvas;
let greyCtx;
let greyImgData;
let greyDataCopy = [];

let gradientCanvas;
let gradientCtx;
let gradientImgData;
let gradientDataCopy = [];

let topTri;
let botTri;
let maxLeft;
let maxRight;
let currVertPos;
let triOffset = -9;
let startCarving = false;

const init = function() {
  image = document.getElementById('source-image');
  let sample1 = document.getElementById('sample1');
  let sample2 = document.getElementById('sample2');
  let sample3 = document.getElementById('sample3');

  const handleClick = function(imgPath) {
    return function() {
      image.src = imgPath;
      sample1.classList.remove("blue-border")
      sample2.classList.remove("blue-border")
      sample3.classList.remove("blue-border")
      this.classList.add("blue-border")
      initializeCarve();
    }
  }

  sample1.addEventListener('click', handleClick("img/Broadway_tower_edit.jpg"))
  sample2.addEventListener('click', handleClick("img/dolphin.png"))
  sample3.addEventListener('click', handleClick("img/pietro-de-grandi.jpg"))

  topTri = document.getElementById('top-triangle');
  botTri = document.getElementById('bottom-triangle');

  dragElement(topTri);
  dragElement(botTri);
  initializeCarve();
}

const initializeCarve = function() {
  startCarving = false;
  baseDataCopy = [];
  greyDataCopy = [];
  gradientDataCopy = [];

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

  maxRight = (baseCanvas.width + triOffset);
  maxLeft = triOffset;
  topTri.style.left = maxRight + "px";
  topTri.style.top =  "-15px";
  botTri.style.left = maxRight + "px";
  botTri.style.top = baseCanvas.height + "px";

  copyData(baseImgData.data, baseDataCopy);
  
  getGreyScale();
  getGradientMagnitude(gradientImgData.data);
  gradientCtx.putImageData(gradientImgData, 0, 0);
  copyData(gradientImgData.data, gradientDataCopy);
};

const drawImage = function(image) {
  baseCtx.drawImage(image, 0, 0, image.width, image.height);
};

const copyData = function(data, copy) {
  for (let i = 0; i < data.length; i += 1) {
    copy.push(data[i])
  }
}

const getGreyScale = function() {
  greyImgData = greyCtx.getImageData(0, 0, greyCanvas.width, greyCanvas.height);
  let baseData = baseImgData.data;
  let greyData = greyImgData.data;
  for (let i = 0; i < baseData.length; i += 4) {
    let greyVal = 0.2 * baseData[i] + 0.72 * baseData[i+1] + 0.07 * baseData[i+2];
    greyData[i] = greyVal;
    greyData[i+1] = greyVal;
    greyData[i+2] = greyVal;
    greyData[i+3] = baseData[i+3];
  }
  greyCtx.putImageData(greyImgData, 0, 0);
  copyData(greyData, greyDataCopy);
}

const getPixelFromXY = function(x, y, data, defaultVal = undefined) {
  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {
    return data[(x + y * baseCanvas.width) * 4];
  } else {
    return defaultVal;
  }
}

const setPixelFromXY = function(x, y, data, val) {
  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {
    const i = (x + y * baseCanvas.width) * 4;
    data[i] = val.r === undefined ? val : val.r;
    data[i+1] = val.g === undefined ? val : val.g;
    data[i+2] = val.b === undefined ? val : val.b;
    data[i+3] = baseDataCopy[i+3];
    return true;
  } else {
    return false;
  }
}

const getSurroundingPixels = function(x, y) {
  let defaultVal = getPixelFromXY(x, y, greyDataCopy);

  return {
    left: getPixelFromXY(x-1, y, greyDataCopy, defaultVal),
    right: getPixelFromXY(x+1, y, greyDataCopy, defaultVal),
    up: getPixelFromXY(x, y-1, greyDataCopy, defaultVal),
    down: getPixelFromXY(x, y+1, greyDataCopy, defaultVal)
  }
}

const getGradientMagnitude = function(gradData) {
  for (let x = 0; x < baseCanvas.width; x++) {
    for (let y = 0; y < baseCanvas.height; y++) {
      let pixels = getSurroundingPixels(x, y);
      
      let diffx = pixels.left - pixels.right;
      let diffy = pixels.up - pixels.down;
      let magnitude = Math.sqrt(diffx*diffx + diffy*diffy);
      let normalized = Math.floor(magnitude * 255/361);
      setPixelFromXY(x, y, gradData, normalized);
    }
  }
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
  let energyMatrix = [...Array(baseCanvas.height)].map(e => Array(baseCanvas.width));

  for (let y = 0; y < baseCanvas.height; y++) {
    for (let x = 0; x < baseCanvas.width; x++) {
      const currVal = getPixelFromXY(x, y, gradientDataCopy);
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

const carve = function(data, seamSet) {
  let newData = [];
  for (let i = 0; i < data.length; i += 4) {
    let x = (i / 4) % baseCanvas.width;
    let y = Math.floor((i / 4) / baseCanvas.width);
    if (!seamSet.has([y,x].toString())) {
      newData.push(...data.slice(i, i+4));
    }
  }
  return newData;
}

const redraw = function() {
  baseCanvas.width -= 1;
  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);
  baseData = baseImgData.data;
  for (let i = 0; i < baseData.length; i += 1) {
    baseData[i] = baseDataCopy[i];
  }
  baseCtx.putImageData(baseImgData, 0, 0);
}

const carveAll = function(seamSet) {
  baseDataCopy = carve(baseDataCopy, seamSet);
  greyDataCopy = carve(greyDataCopy, seamSet);
  gradientDataCopy = new Array(baseDataCopy.length);
  redraw();
  getGradientMagnitude(gradientDataCopy);
}

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  elmnt.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    startCarving = false;
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    let newX = elmnt.offsetLeft - pos1;
    if (newX <= maxRight && newX >= maxLeft) {
      topTri.style.left = newX + "px";
      botTri.style.left = newX + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    startCarving = true;
    currVertPos = parseInt(topTri.style.left) - triOffset;
    seamTimer();
  }
}

const seamTimer = function() {
  if (baseCanvas.width <= currVertPos || !startCarving) return;
  const seamSet = getSeam();
  setTimeout(carveTimer(seamSet), 100)
}

const carveTimer = function(seamSet) {
  return () => {
    carveAll(seamSet);
    maxRight = baseCanvas.width + triOffset;
    setTimeout(seamTimer, 100);
  }
}

window.addEventListener('load', init);