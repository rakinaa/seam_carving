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

let rightTri;
let leftTri;
let maxTop;
let maxBot;
let currHorizPos;

let toggleButton;

let triOffset = -9;
let startCarving = false;
let vertCarve = true;

const init = function () {
  image = document.getElementById("source-image");
  let sample1 = document.getElementById("sample1");
  let sample2 = document.getElementById("sample2");
  let sample3 = document.getElementById("sample3");

  sample2.classList.add("blue-border");

  toggleButton = document.getElementById("toggle-button");
  toggleButton.onclick = toggleCarve;

  const handleClick = function (imgPath) {
    return function () {
      image.src = imgPath;
      sample1.classList.remove("blue-border");
      sample2.classList.remove("blue-border");
      sample3.classList.remove("blue-border");
      this.classList.add("blue-border");
      initializeCarve();
    };
  };

  sample1.addEventListener("click", handleClick("img/Broadway_tower_edit.jpg"));
  sample2.addEventListener("click", handleClick("img/dolphin.png"));
  sample3.addEventListener("click", handleClick("img/pietro-de-grandi.jpg"));

  topTri = document.getElementById("top-triangle");
  botTri = document.getElementById("bottom-triangle");
  leftTri = document.getElementById("left-triangle");
  rightTri = document.getElementById("right-triangle");

  leftTri.style.display = "none";
  rightTri.style.display = "none";

  dragElement(topTri);
  dragElement(botTri);
  dragHorizElement(rightTri);
  dragHorizElement(leftTri);
  initializeCarve();
};

const initializeCarve = function () {
  startCarving = false;
  baseDataCopy = [];
  greyDataCopy = [];
  gradientDataCopy = [];

  baseContainer = document.getElementById("base");
  baseContainer.style.height = image.height + "px";

  baseCanvas = document.getElementById("base-canvas");
  baseCtx = baseCanvas.getContext("2d");
  baseCanvas.width = image.width;
  baseCanvas.height = image.height;

  greyCanvas = document.getElementById("grey-canvas");
  greyCtx = greyCanvas.getContext("2d");
  greyCanvas.width = image.width;
  greyCanvas.height = image.height;

  gradientCanvas = document.getElementById("gradient-canvas");
  gradientCtx = gradientCanvas.getContext("2d");
  gradientCanvas.width = image.width;
  gradientCanvas.height = image.height;

  drawImage(image);

  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);
  gradientImgData = gradientCtx.getImageData(
    0,
    0,
    gradientCanvas.width,
    gradientCanvas.height
  );

  maxRight = baseCanvas.width + triOffset;
  currVertPos = maxRight - triOffset;
  maxLeft = triOffset;
  topTri.style.left = maxRight + "px";
  topTri.style.top = "-15px";
  botTri.style.left = maxRight + "px";
  botTri.style.top = baseCanvas.height + "px";

  maxBot = baseCanvas.height + triOffset;
  currHorizPos = maxBot - triOffset;
  maxTop = triOffset;
  leftTri.style.top = maxBot + "px";
  leftTri.style.left = "-15px";
  rightTri.style.top = maxBot + "px";
  rightTri.style.left = baseCanvas.width + "px";

  copyData(baseImgData.data, baseDataCopy);

  getGreyScale();
  getGradientMagnitude(gradientImgData.data);
  gradientCtx.putImageData(gradientImgData, 0, 0);
  copyData(gradientImgData.data, gradientDataCopy);
};

const drawImage = function (image) {
  baseCtx.drawImage(image, 0, 0, image.width, image.height);
};

const copyData = function (data, copy) {
  for (let i = 0; i < data.length; i += 1) {
    copy.push(data[i]);
  }
};

const toggleCarve = function () {
  maxRight = baseCanvas.width + triOffset;
  maxBot = baseCanvas.height + triOffset;
  vertCarve = !vertCarve;
  startCarving = false;

  leftTri.style.top = maxBot + "px";
  rightTri.style.top = maxBot + "px";
  topTri.style.left = maxRight + "px";
  botTri.style.left = maxRight + "px";
  currVertPos = parseInt(topTri.style.left) - triOffset;
  currHorizPos = parseInt(leftTri.style.top) - triOffset;

  if (vertCarve) {
    leftTri.style.display = "none";
    rightTri.style.display = "none";
    topTri.style.display = "block";
    botTri.style.display = "block";
  } else {
    leftTri.style.display = "block";
    rightTri.style.display = "block";
    topTri.style.display = "none";
    botTri.style.display = "none";
  }
};

const getGreyScale = function () {
  greyImgData = greyCtx.getImageData(0, 0, greyCanvas.width, greyCanvas.height);
  let baseData = baseImgData.data;
  let greyData = greyImgData.data;
  for (let i = 0; i < baseData.length; i += 4) {
    let greyVal =
      0.2 * baseData[i] + 0.72 * baseData[i + 1] + 0.07 * baseData[i + 2];
    greyData[i] = greyVal;
    greyData[i + 1] = greyVal;
    greyData[i + 2] = greyVal;
    greyData[i + 3] = baseData[i + 3];
  }
  greyCtx.putImageData(greyImgData, 0, 0);
  copyData(greyData, greyDataCopy);
};

const getPixelFromXY = function (x, y, data, defaultVal = undefined) {
  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {
    return data[(x + y * baseCanvas.width) * 4];
  } else {
    return defaultVal;
  }
};

const setPixelFromXY = function (x, y, data, val) {
  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {
    const i = (x + y * baseCanvas.width) * 4;
    data[i] = val.r === undefined ? val : val.r;
    data[i + 1] = val.g === undefined ? val : val.g;
    data[i + 2] = val.b === undefined ? val : val.b;
    data[i + 3] = baseDataCopy[i + 3];
    return true;
  } else {
    return false;
  }
};

const getSurroundingPixels = function (x, y) {
  let defaultVal = getPixelFromXY(x, y, greyDataCopy);

  return {
    left: getPixelFromXY(x - 1, y, greyDataCopy, defaultVal),
    right: getPixelFromXY(x + 1, y, greyDataCopy, defaultVal),
    up: getPixelFromXY(x, y - 1, greyDataCopy, defaultVal),
    down: getPixelFromXY(x, y + 1, greyDataCopy, defaultVal),
  };
};

const getGradientMagnitude = function (gradData) {
  for (let x = 0; x < baseCanvas.width; x++) {
    for (let y = 0; y < baseCanvas.height; y++) {
      let pixels = getSurroundingPixels(x, y);

      let diffx = pixels.left - pixels.right;
      let diffy = pixels.up - pixels.down;
      let magnitude = Math.sqrt(diffx * diffx + diffy * diffy);
      let normalized = Math.floor((magnitude * 255) / 361);
      setPixelFromXY(x, y, gradData, normalized);
    }
  }
};

const getCoords = function (x, y, matrix) {
  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {
    return matrix[y][x];
  } else {
    return undefined;
  }
};
const getMinEnergyFromXY = function (x, y, matrix) {
  const aboveRow = [
    getCoords(x - 1, y - 1, matrix),
    getCoords(x, y - 1, matrix),
    getCoords(x + 1, y - 1, matrix),
  ].filter((el) => el !== undefined);
  return aboveRow.length > 0 ? Math.min(...aboveRow) : 0;
};

const getEnergyMatrix = function () {
  let energyMatrix = [...Array(baseCanvas.height)].map((e) =>
    Array(baseCanvas.width)
  );

  for (let y = 0; y < baseCanvas.height; y++) {
    for (let x = 0; x < baseCanvas.width; x++) {
      const currVal = getPixelFromXY(x, y, gradientDataCopy);
      const minEnergy = getMinEnergyFromXY(x, y, energyMatrix);
      energyMatrix[y][x] = currVal + minEnergy;
    }
  }

  return energyMatrix;
};

const getSeam = function () {
  let energyMatrix = getEnergyMatrix();
  let seamx = 0;
  let seamy = baseCanvas.height - 1;
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
    setPixelFromXY(seamx, seamy, baseData, { r: 255, g: 0, b: 0 });
    seamSet.add([seamy, seamx].toString());

    if (seamy === 0) {
      break;
    }

    minVal = energyMatrix[seamy - 1][seamx];
    let left = energyMatrix[seamy - 1][seamx - 1];
    let right = energyMatrix[seamy - 1][seamx + 1];

    if (left !== undefined && left < minVal) {
      seamx = seamx - 1;
      minVal = left;
    } else if (right !== undefined && right < minVal) {
      seamx = seamx + 1;
      minVal = right;
    }
    seamy--;
  }
  baseCtx.putImageData(baseImgData, 0, 0);

  return seamSet;
};

const getHorizSeam = function () {
  let energyMatrix = getHorizEnergyMatrix();
  let seamx = baseCanvas.width - 1;
  let seamy = 0;
  let minVal = energyMatrix[seamy][seamx];

  for (let i = 1; i < baseCanvas.height; i++) {
    if (minVal > energyMatrix[i][seamx]) {
      seamy = i;
      minVal = energyMatrix[i][seamx];
    }
  }

  let seamSet = new Set();

  let baseData = baseImgData.data;
  while (seamx >= 0) {
    setPixelFromXY(seamx, seamy, baseData, { r: 255, g: 0, b: 0 });
    seamSet.add([seamy, seamx].toString());

    if (seamx === 0) {
      break;
    }

    minVal = energyMatrix[seamy][seamx - 1];
    let above = getCoords(seamx - 1, seamy - 1, energyMatrix);
    let below = getCoords(seamx - 1, seamy + 1, energyMatrix);

    if (above !== undefined && above < minVal) {
      seamy = seamy - 1;
      minVal = above;
    } else if (below !== undefined && below < minVal) {
      seamy = seamy + 1;
      minVal = below;
    }
    seamx--;
  }
  baseCtx.putImageData(baseImgData, 0, 0);

  return seamSet;
};

const getHorizMinEnergy = function (x, y, matrix) {
  const leftRow = [
    getCoords(x - 1, y - 1, matrix),
    getCoords(x - 1, y, matrix),
    getCoords(x - 1, y + 1, matrix),
  ].filter((el) => el !== undefined);
  return leftRow.length > 0 ? Math.min(...leftRow) : 0;
};

const getHorizEnergyMatrix = function () {
  let energyMatrix = [...Array(baseCanvas.height)].map((e) =>
    Array(baseCanvas.width)
  );

  for (let x = 0; x < baseCanvas.width; x++) {
    for (let y = 0; y < baseCanvas.height; y++) {
      const currVal = getPixelFromXY(x, y, gradientDataCopy);
      const minEnergy = getHorizMinEnergy(x, y, energyMatrix);
      energyMatrix[y][x] = currVal + minEnergy;
    }
  }

  return energyMatrix;
};

const carve = function (data, seamSet) {
  let newData = [];
  for (let i = 0; i < data.length; i += 4) {
    let x = (i / 4) % baseCanvas.width;
    let y = Math.floor(i / 4 / baseCanvas.width);
    if (!seamSet.has([y, x].toString())) {
      newData.push(...data.slice(i, i + 4));
    }
  }
  return newData;
};

const getAllFromPixel = function (x, y, data) {
  let ind = (x + y * baseCanvas.width) * 4;
  return data.slice(ind, ind + 4);
};

const transpose = function (data) {
  let transposed = [...Array(baseCanvas.width)].map((e) =>
    Array(baseCanvas.height)
  );
  for (let y = 0; y < baseCanvas.height; y++) {
    for (let x = 0; x < baseCanvas.width; x++) {
      transposed[x][y] = getAllFromPixel(x, y, data);
    }
  }
  return transposed;
};

const carveHoriz = function (data, seamSet) {
  let t = transpose(data);
  for (let y = 0; y < t.length; y++) {
    for (let x = 0; x < t[0].length; x++) {
      if (seamSet.has([x, y].toString())) {
        t[y].splice(x, 1);
      }
    }
  }

  let newData = [];
  for (let x = 0; x < t[0].length; x++) {
    for (let y = 0; y < t.length; y++) {
      newData.push(...t[y][x]);
    }
  }
  return newData;
};

const redraw = function () {
  baseCanvas.width -= 1;
  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);
  baseData = baseImgData.data;
  for (let i = 0; i < baseData.length; i += 1) {
    baseData[i] = baseDataCopy[i];
  }
  baseCtx.putImageData(baseImgData, 0, 0);
};

const carveAll = function (seamSet) {
  baseDataCopy = carve(baseDataCopy, seamSet);
  greyDataCopy = carve(greyDataCopy, seamSet);
  gradientDataCopy = new Array(baseDataCopy.length);
  redraw();
  getGradientMagnitude(gradientDataCopy);
};

const redrawHoriz = function () {
  baseCanvas.height -= 1;
  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);
  baseData = baseImgData.data;
  for (let i = 0; i < baseData.length; i += 1) {
    baseData[i] = baseDataCopy[i];
  }
  baseCtx.putImageData(baseImgData, 0, 0);
};

const carveAllHoriz = function (seamSet) {
  baseDataCopy = carveHoriz(baseDataCopy, seamSet);
  greyDataCopy = carveHoriz(greyDataCopy, seamSet);
  gradientDataCopy = new Array(baseDataCopy.length);
  redrawHoriz();
  getGradientMagnitude(gradientDataCopy);
};

function dragElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
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

function dragHorizElement(elmnt) {
  var pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
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
    let newY = elmnt.offsetTop - pos2;
    if (newY <= maxBot && newY >= maxTop) {
      leftTri.style.top = newY + "px";
      rightTri.style.top = newY + "px";
    }
  }

  function closeDragElement() {
    document.onmouseup = null;
    document.onmousemove = null;
    startCarving = true;
    currHorizPos = parseInt(leftTri.style.top) - triOffset;
    seamTimer();
  }
}

const seamTimer = function () {
  if (!startCarving) return;
  if (baseCanvas.width <= currVertPos && baseCanvas.height > currHorizPos) {
    seamTimerHoriz();
  } else if (baseCanvas.width > currVertPos) {
    const seamSet = getSeam();
    setTimeout(carveTimer(seamSet), 100);
  } else {
    return;
  }
};

const carveTimer = function (seamSet) {
  return () => {
    carveAll(seamSet);
    maxRight = baseCanvas.width + triOffset;
    rightTri.style.left = maxRight - triOffset + "px";
    setTimeout(seamTimerHoriz, 100);
  };
};

const seamTimerHoriz = function () {
  if (!startCarving) return;
  if (baseCanvas.height <= currHorizPos && baseCanvas.width > currVertPos) {
    seamTimer();
  } else if (baseCanvas.height > currHorizPos) {
    const seamSet = getHorizSeam();
    setTimeout(carveTimerHoriz(seamSet), 100);
  } else {
    return;
  }
};

const carveTimerHoriz = function (seamSet) {
  return () => {
    carveAllHoriz(seamSet);
    maxBot = baseCanvas.height + triOffset;
    botTri.style.top = maxBot - triOffset + "px";
    setTimeout(seamTimer, 100);
  };
};

window.addEventListener("load", init);
