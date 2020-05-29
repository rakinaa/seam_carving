/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("let image;\n\nlet baseCanvas;\nlet baseCtx;\nlet baseImgData;\nlet baseDataCopy = [];\n\nlet greyCanvas;\nlet greyCtx;\nlet greyImgData;\nlet greyDataCopy = [];\n\nlet gradientCanvas;\nlet gradientCtx;\nlet gradientImgData;\nlet gradientDataCopy = [];\n\nlet topTri;\nlet botTri;\nlet maxLeft;\nlet maxRight;\nlet currVertPos;\n\nlet rightTri;\nlet leftTri;\nlet maxTop;\nlet maxBot;\nlet currHorizPos;\n\nlet triOffset = -9;\nlet startCarving = false;\n\nconst init = function() {\n  image = document.getElementById('source-image');\n  let sample1 = document.getElementById('sample1');\n  let sample2 = document.getElementById('sample2');\n  let sample3 = document.getElementById('sample3');\n\n  const handleClick = function(imgPath) {\n    return function() {\n      image.src = imgPath;\n      sample1.classList.remove(\"blue-border\")\n      sample2.classList.remove(\"blue-border\")\n      sample3.classList.remove(\"blue-border\")\n      this.classList.add(\"blue-border\")\n      initializeCarve();\n    }\n  }\n\n  sample1.addEventListener('click', handleClick(\"img/Broadway_tower_edit.jpg\"))\n  sample2.addEventListener('click', handleClick(\"img/dolphin.png\"))\n  sample3.addEventListener('click', handleClick(\"img/pietro-de-grandi.jpg\"))\n\n  topTri = document.getElementById('top-triangle');\n  botTri = document.getElementById('bottom-triangle');\n  leftTri = document.getElementById('left-triangle');\n  rightTri = document.getElementById('right-triangle');\n\n  dragElement(topTri);\n  dragElement(botTri);\n  dragHorizElement(rightTri);\n  dragHorizElement(leftTri);\n  initializeCarve();\n}\n\nconst initializeCarve = function() {\n  startCarving = false;\n  baseDataCopy = [];\n  greyDataCopy = [];\n  gradientDataCopy = [];\n  \n  baseContainer = document.getElementById('base');\n  baseContainer.style.height = image.height + \"px\";\n\n  baseCanvas = document.getElementById('base-canvas');\n  baseCtx = baseCanvas.getContext('2d');\n  baseCanvas.width = image.width;\n  baseCanvas.height = image.height;\n\n  greyCanvas = document.getElementById('grey-canvas');\n  greyCtx = greyCanvas.getContext('2d');\n  greyCanvas.width = image.width;\n  greyCanvas.height = image.height;\n\n  gradientCanvas = document.getElementById('gradient-canvas');\n  gradientCtx = gradientCanvas.getContext('2d');\n  gradientCanvas.width = image.width;\n  gradientCanvas.height = image.height;\n\n  drawImage(image);\n\n  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);\n  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);\n\n  maxRight = (baseCanvas.width + triOffset);\n  currVertPos = maxRight - triOffset;\n  maxLeft = triOffset;\n  topTri.style.left = maxRight + \"px\";\n  topTri.style.top =  \"-15px\";\n  botTri.style.left = maxRight + \"px\";\n  botTri.style.top = baseCanvas.height + \"px\";\n\n  maxBot = (baseCanvas.height + triOffset);\n  currHorizPos = maxBot - triOffset;\n  maxTop = triOffset;\n  leftTri.style.top = maxBot + \"px\";\n  leftTri.style.left =  \"-15px\";\n  rightTri.style.top = maxBot + \"px\";\n  rightTri.style.left = baseCanvas.width + \"px\";\n\n  copyData(baseImgData.data, baseDataCopy);\n  \n  getGreyScale();\n  getGradientMagnitude(gradientImgData.data);\n  gradientCtx.putImageData(gradientImgData, 0, 0);\n  copyData(gradientImgData.data, gradientDataCopy);\n  // getHorizSeam();\n};\n\nconst drawImage = function(image) {\n  baseCtx.drawImage(image, 0, 0, image.width, image.height);\n};\n\nconst copyData = function(data, copy) {\n  for (let i = 0; i < data.length; i += 1) {\n    copy.push(data[i])\n  }\n}\n\nconst getGreyScale = function() {\n  greyImgData = greyCtx.getImageData(0, 0, greyCanvas.width, greyCanvas.height);\n  let baseData = baseImgData.data;\n  let greyData = greyImgData.data;\n  for (let i = 0; i < baseData.length; i += 4) {\n    let greyVal = 0.2 * baseData[i] + 0.72 * baseData[i+1] + 0.07 * baseData[i+2];\n    greyData[i] = greyVal;\n    greyData[i+1] = greyVal;\n    greyData[i+2] = greyVal;\n    greyData[i+3] = baseData[i+3];\n  }\n  greyCtx.putImageData(greyImgData, 0, 0);\n  copyData(greyData, greyDataCopy);\n}\n\nconst getPixelFromXY = function(x, y, data, defaultVal = undefined) {\n  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {\n    return data[(x + y * baseCanvas.width) * 4];\n  } else {\n    return defaultVal;\n  }\n}\n\nconst setPixelFromXY = function(x, y, data, val) {\n  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {\n    const i = (x + y * baseCanvas.width) * 4;\n    data[i] = val.r === undefined ? val : val.r;\n    data[i+1] = val.g === undefined ? val : val.g;\n    data[i+2] = val.b === undefined ? val : val.b;\n    data[i+3] = baseDataCopy[i+3];\n    return true;\n  } else {\n    return false;\n  }\n}\n\nconst getSurroundingPixels = function(x, y) {\n  let defaultVal = getPixelFromXY(x, y, greyDataCopy);\n\n  return {\n    left: getPixelFromXY(x-1, y, greyDataCopy, defaultVal),\n    right: getPixelFromXY(x+1, y, greyDataCopy, defaultVal),\n    up: getPixelFromXY(x, y-1, greyDataCopy, defaultVal),\n    down: getPixelFromXY(x, y+1, greyDataCopy, defaultVal)\n  }\n}\n\nconst getGradientMagnitude = function(gradData) {\n  for (let x = 0; x < baseCanvas.width; x++) {\n    for (let y = 0; y < baseCanvas.height; y++) {\n      let pixels = getSurroundingPixels(x, y);\n      \n      let diffx = pixels.left - pixels.right;\n      let diffy = pixels.up - pixels.down;\n      let magnitude = Math.sqrt(diffx*diffx + diffy*diffy);\n      let normalized = Math.floor(magnitude * 255/361);\n      setPixelFromXY(x, y, gradData, normalized);\n    }\n  }\n}\n\nconst getCoords = function(x, y, matrix) {\n  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {\n    return matrix[y][x];\n  } else {\n    return undefined\n  }\n}\nconst getMinEnergyFromXY = function(x, y, matrix) {\n  const aboveRow = [\n    getCoords(x-1, y-1, matrix),\n    getCoords(x, y-1, matrix),\n    getCoords(x+1, y-1, matrix)\n  ].filter((el) => el !== undefined);\n  return aboveRow.length > 0 ? Math.min(...aboveRow) : 0;\n}\n\nconst getEnergyMatrix = function() {\n  let energyMatrix = [...Array(baseCanvas.height)].map(e => Array(baseCanvas.width));\n\n  for (let y = 0; y < baseCanvas.height; y++) {\n    for (let x = 0; x < baseCanvas.width; x++) {\n      const currVal = getPixelFromXY(x, y, gradientDataCopy);\n      const minEnergy = getMinEnergyFromXY(x, y, energyMatrix);\n      energyMatrix[y][x] = currVal + minEnergy;\n    }\n  }\n\n  return energyMatrix;\n}\n\n\nconst getSeam = function() {\n  let energyMatrix = getEnergyMatrix();\n  let seamx = 0\n  let seamy = baseCanvas.height-1;\n  let minVal = energyMatrix[seamy][0];\n\n  for (let i = 1; i < baseCanvas.width; i++) {\n    if (minVal > energyMatrix[seamy][i]) {\n      seamx = i;\n      minVal = energyMatrix[seamy][i];\n    }\n  }\n\n  let seamSet = new Set();\n\n  let baseData = baseImgData.data;\n  while (seamy >= 0) {\n    setPixelFromXY(seamx, seamy, baseData, {r: 255, g: 0, b: 0});\n    seamSet.add([seamy, seamx].toString())\n\n    if (seamy === 0) { break; }\n\n    minVal = energyMatrix[seamy-1][seamx];\n    let left = energyMatrix[seamy-1][seamx-1]\n    let right = energyMatrix[seamy-1][seamx+1]\n    \n    if (left !== undefined && left < minVal) {\n      seamx = seamx-1;\n      minVal = left;\n    } else if (right !== undefined && right < minVal) {\n      seamx = seamx+1;\n      minVal = right;\n    }\n    seamy--;\n  }\n  baseCtx.putImageData(baseImgData, 0, 0);\n\n  return seamSet;\n}\n\nconst getHorizSeam = function() {\n  let energyMatrix = getHorizEnergyMatrix();\n  let seamx = baseCanvas.width-1;\n  let seamy = 0;\n  let minVal = energyMatrix[seamy][seamx];\n\n  for (let i = 1; i < baseCanvas.height; i++) {\n    if (minVal > energyMatrix[i][seamx]) {\n      seamy = i;\n      minVal = energyMatrix[i][seamx];\n    }\n  }\n\n  let seamSet = new Set();\n\n  let baseData = baseImgData.data;\n  while (seamx >= 0) {\n    setPixelFromXY(seamx, seamy, baseData, {r: 255, g: 0, b: 0});\n    seamSet.add([seamy, seamx].toString())\n\n    if (seamx === 0) { break; }\n\n    minVal = energyMatrix[seamy][seamx-1];\n    let above = getCoords(seamx-1, seamy-1, energyMatrix)\n    let below = getCoords(seamx-1, seamy+1, energyMatrix)\n    \n    if (above !== undefined && above < minVal) {\n      seamy = seamy-1;\n      minVal = above;\n    } else if (below !== undefined && below < minVal) {\n      seamy = seamy+1;\n      minVal = below;\n    }\n    seamx--;\n  }\n  baseCtx.putImageData(baseImgData, 0, 0);\n\n  return seamSet;\n}\n\nconst getHorizMinEnergy = function(x, y, matrix) {\n  const leftRow = [\n    getCoords(x-1, y-1, matrix),\n    getCoords(x-1, y, matrix),\n    getCoords(x-1, y+1, matrix)\n  ].filter((el) => el !== undefined);\n  return leftRow.length > 0 ? Math.min(...leftRow) : 0;\n}\n\nconst getHorizEnergyMatrix = function() {\n  let energyMatrix = [...Array(baseCanvas.height)].map(e => Array(baseCanvas.width));\n\n  for (let x = 0; x < baseCanvas.width; x++) {\n    for (let y = 0; y < baseCanvas.height; y++) {\n      const currVal = getPixelFromXY(x, y, gradientDataCopy);\n      const minEnergy = getHorizMinEnergy(x, y, energyMatrix);\n      energyMatrix[y][x] = currVal + minEnergy;\n    }\n  }\n\n  return energyMatrix;\n}\n\nconst carve = function(data, seamSet) {\n  let newData = [];\n  for (let i = 0; i < data.length; i += 4) {\n    let x = (i / 4) % baseCanvas.width;\n    let y = Math.floor((i / 4) / baseCanvas.width);\n    if (!seamSet.has([y,x].toString())) {\n      newData.push(...data.slice(i, i+4));\n    } \n  }\n  return newData;\n}\n\n\nconst getAllFromPixel = function(x ,y, data) {\n  let ind = (x + y * baseCanvas.width) * 4\n  return data.slice(ind, ind+4);\n}\n\nconst transpose = function(data) {\n  let transposed = [...Array(baseCanvas.width)].map(e => Array(baseCanvas.height));\n  for (let y = 0; y < baseCanvas.height; y++) {\n    for (let x = 0; x < baseCanvas.width; x++) {\n      transposed[x][y] = getAllFromPixel(x, y, data)\n    }\n  }\n  return transposed;\n}\n\n\nconst carveHoriz = function(data, seamSet) {\n  let t = transpose(data);\n  // console.log(t.length)\n  // console.log(t[0].length)\n  for (let y = 0; y < t.length; y++) {\n    for (let x = 0; x < t[0].length; x++) {\n      if (seamSet.has([x,y].toString())) {\n        t[y].splice(x,1);\n      }\n    }\n  }\n  // console.log(t.length)\n  // console.log(t[50].length)\n\n  let newData = [];\n  for (let x = 0; x < t[0].length; x++) {\n    for (let y = 0; y < t.length; y++) {\n      newData.push(...t[y][x])\n    }\n  }\n  // for (let i = 0; i < data.length; i += 4) {\n  //   let x = (i / 4) % baseCanvas.width;\n  //   let y = Math.floor((i / 4) / baseCanvas.width);\n  //   if (!seamSet.has([y,x].toString())) {\n  //     newData.push(...data.slice(i, i+4));\n  //   } \n  // }\n  return newData;\n}\n\nconst redraw = function() {\n  baseCanvas.width -= 1\n  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);\n  baseData = baseImgData.data;\n  for (let i = 0; i < baseData.length; i += 1) {\n    baseData[i] = baseDataCopy[i];\n  }\n  baseCtx.putImageData(baseImgData, 0, 0);\n}\n\nconst carveAll = function(seamSet) {\n  baseDataCopy = carve(baseDataCopy, seamSet);\n  greyDataCopy = carve(greyDataCopy, seamSet);\n  gradientDataCopy = new Array(baseDataCopy.length);\n  redraw();\n  getGradientMagnitude(gradientDataCopy);\n}\n\nconst redrawHoriz = function() {\n  baseCanvas.height -= 1\n  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);\n  baseData = baseImgData.data;\n  // console.log(baseData.length);\n  // console.log(baseDataCopy.length);\n  for (let i = 0; i < baseData.length; i += 1) {\n    baseData[i] = baseDataCopy[i];\n  }\n  baseCtx.putImageData(baseImgData, 0, 0);\n}\n\nconst carveAllHoriz = function(seamSet) {\n  baseDataCopy = carveHoriz(baseDataCopy, seamSet);\n  greyDataCopy = carveHoriz(greyDataCopy, seamSet);\n  gradientDataCopy = new Array(baseDataCopy.length);\n  redrawHoriz();\n  getGradientMagnitude(gradientDataCopy);\n}\n\nfunction dragElement(elmnt) {\n  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;\n  elmnt.onmousedown = dragMouseDown;\n\n  function dragMouseDown(e) {\n    e = e || window.event;\n    e.preventDefault();\n    startCarving = false;\n    pos3 = e.clientX;\n    pos4 = e.clientY;\n    document.onmouseup = closeDragElement;\n    document.onmousemove = elementDrag;\n  }\n\n  function elementDrag(e) {\n    e = e || window.event;\n    e.preventDefault();\n    pos1 = pos3 - e.clientX;\n    pos2 = pos4 - e.clientY;\n    pos3 = e.clientX;\n    pos4 = e.clientY;\n    // elmnt.style.top = (elmnt.offsetTop - pos2) + \"px\";\n    let newX = elmnt.offsetLeft - pos1;\n    if (newX <= maxRight && newX >= maxLeft) {\n      topTri.style.left = newX + \"px\";\n      botTri.style.left = newX + \"px\";\n    }\n  }\n\n  function closeDragElement() {\n    document.onmouseup = null;\n    document.onmousemove = null;\n    startCarving = true;\n    currVertPos = parseInt(topTri.style.left) - triOffset;\n    seamTimer();\n  }\n}\n\nfunction dragHorizElement(elmnt) {\n  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;\n  elmnt.onmousedown = dragMouseDown;\n\n  function dragMouseDown(e) {\n    e = e || window.event;\n    e.preventDefault();\n    startCarving = false;\n    pos3 = e.clientX;\n    pos4 = e.clientY;\n    document.onmouseup = closeDragElement;\n    document.onmousemove = elementDrag;\n  }\n\n  function elementDrag(e) {\n    e = e || window.event;\n    e.preventDefault();\n    pos1 = pos3 - e.clientX;\n    pos2 = pos4 - e.clientY;\n    pos3 = e.clientX;\n    pos4 = e.clientY;\n    // elmnt.style.top = (elmnt.offsetTop - pos2) + \"px\";\n    let newY = elmnt.offsetTop - pos2;\n    if (newY <= maxBot && newY >= maxTop) {\n      leftTri.style.top = newY + \"px\";\n      rightTri.style.top = newY + \"px\";\n    }\n  }\n\n  function closeDragElement() {\n    document.onmouseup = null;\n    document.onmousemove = null;\n    startCarving = true;\n    currHorizPos = parseInt(leftTri.style.top) - triOffset;\n    seamTimer();\n  }\n}\n\nconst seamTimer = function() {\n  if (!startCarving) return;\n  if (baseCanvas.width <= currVertPos && baseCanvas.height > currHorizPos) {\n    seamTimerHoriz();\n  } else if (baseCanvas.width > currVertPos) {\n    const seamSet = getSeam();\n    setTimeout(carveTimer(seamSet), 100)\n  } else {\n    return;\n  }\n}\n\nconst carveTimer = function(seamSet) {\n  return () => {\n    carveAll(seamSet);\n    maxRight = baseCanvas.width + triOffset;\n    rightTri.style.left = (maxRight-triOffset) + \"px\";\n    setTimeout(seamTimerHoriz, 100);\n  }\n}\n\nconst seamTimerHoriz = function() {\n  if (!startCarving) return;\n  if (baseCanvas.height <= currHorizPos && baseCanvas.width > currVertPos) {\n    seamTimer();\n  } else if (baseCanvas.height > currHorizPos) {\n    const seamSet = getHorizSeam();\n    setTimeout(carveTimerHoriz(seamSet), 100)\n  } else {\n    return;\n  }\n}\n\nconst carveTimerHoriz = function(seamSet) {\n  return () => {\n    carveAllHoriz(seamSet);\n    maxBot = baseCanvas.height + triOffset;\n    botTri.style.top = (maxBot-triOffset) + \"px\";\n    setTimeout(seamTimer, 100);\n  }\n}\n\nwindow.addEventListener('load', init);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });