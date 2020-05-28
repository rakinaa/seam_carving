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

eval("let baseCanvas;\nlet baseCtx;\nlet baseImgData;\nlet baseDataCopy = [];\n\nlet greyCanvas;\nlet greyCtx;\nlet greyImgData;\nlet greyDataCopy = [];\n\nlet gradientCanvas;\nlet gradientCtx;\nlet gradientImgData;\nlet gradientDataCopy = [];\n\nlet topTri;\nlet botTri;\nlet maxLeft;\nlet maxRight;\nlet currVertPos;\nlet triOffset = -9;\nlet startCarving = false;\nsample1.addEventListener('click', () => {\n  console.log(\"hi\")\n  image.src = \"img/Broadway_tower_edit.jpg\"\n})\n\nconst init = function() {\n  let image = document.getElementById('source-image');\n  let sample1 = document.getElementById('sample1');\n\n  baseCanvas = document.getElementById('base-canvas');\n  baseCtx = baseCanvas.getContext('2d');\n  baseCanvas.width = image.width;\n  baseCanvas.height = image.height;\n\n  greyCanvas = document.getElementById('grey-canvas');\n  greyCtx = greyCanvas.getContext('2d');\n  greyCanvas.width = image.width;\n  greyCanvas.height = image.height;\n\n  gradientCanvas = document.getElementById('gradient-canvas');\n  gradientCtx = gradientCanvas.getContext('2d');\n  gradientCanvas.width = image.width;\n  gradientCanvas.height = image.height;\n\n  topTri = document.getElementById('top-triangle');\n  botTri = document.getElementById('bottom-triangle');\n\n  maxRight = (baseCanvas.width + triOffset);\n  maxLeft = triOffset;\n  topTri.style.left = maxRight + \"px\";\n  topTri.style.top =  \"-15px\";\n  botTri.style.left = maxRight + \"px\";\n  botTri.style.top = baseCanvas.height + \"px\";\n  dragElement(topTri);\n\n  drawImage(image);\n\n  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);\n  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);\n\n  copyData(baseImgData.data, baseDataCopy);\n  \n  getGreyScale();\n  getGradientMagnitude(gradientImgData.data);\n  copyData(gradientImgData.data, gradientDataCopy);\n  gradientCtx.putImageData(gradientImgData, 0, 0);\n\n  // let i = 0\n  // const seamTimer = function() {\n  //   if (i >= 250) return;\n  //   i++;\n  //   const seamSet = getSeam();\n  //   setTimeout(carveTimer(seamSet), 1)\n  // }\n\n  // const carveTimer = function(seamSet) {\n  //   return () => {\n  //     carveAll(seamSet);\n  //     setTimeout(seamTimer, 1);\n  //   }\n  // }\n  // seamTimer();\n  // i = 0;\n  // const carveTimer = setInterval(() => {\n  //   const seamSet = getSeam();\n  //   setTimeout(() => {\n  //     carveAll(seamSet);\n  //   }, 50);\n  //   i++;\n  //   if (i > 200) { clearInterval(carveTimer) }\n  // }, 100);\n  // carve(baseImgData, baseCtx, baseCanvas);\n\n  // getSeam();\n  // let s = new Set();\n  // s.add([1,2].toString())\n  // console.log([1,2].toString())\n  // console.log(s.has([1,2].toString()));\n  \n\n  // canvas = document.getElementById('canvas');\n  // c = canvas.getContext('2d');\n  // let imageData = c.getImageData(0, 0, canvas.width, canvas.height);\n  // console.log(image)\n  // let image = new Image();\n  // image.onload = function () {\n  //   drawImage(image);\n  // }\n  // image.src = 'image.jpg';\n};\n\nconst drawImage = function(image) {\n  // let img = new Image();\n  // img.onload=function(){\n  //   // canvas.width=400;\n  //   // canvas.height=300;\n  //   baseCtx.drawImage(img,0,0,300,300);\n  // }\n  // img.src=\"img/rhino.jpg\";\n  // console.log(image.width)\n  // console.log(image.height)\n  // console.log(image.offsetWidth)\n  // console.log(image.offsetHeight)\n  baseCtx.drawImage(image, 0, 0, image.width, image.height);\n};\n\n// const carve = function() {\n//   let imageData = c.getImageData(0, 0, canvas.width, canvas.height);\n//   let data = imageData.data;\n//   for (let i = 0; i < data.length; i += 4) {\n//     data[i] = 55;\n//   }\n//   c.putImageData(imageData, 0, 0);\n// }\n\nconst copyData = function(data, copy) {\n  for (let i = 0; i < data.length; i += 1) {\n    copy.push(data[i])\n  }\n}\n\nconst getGreyScale = function() {\n  greyImgData = greyCtx.getImageData(0, 0, greyCanvas.width, greyCanvas.height);\n  let baseData = baseImgData.data;\n  let greyData = greyImgData.data;\n  for (let i = 0; i < baseData.length; i += 4) {\n    let greyVal = 0.2 * baseData[i] + 0.72 * baseData[i+1] + 0.07 * baseData[i+2];\n    // let greyVal = (baseData[i] + baseData[i+1] + baseData[i+2]) / 3;\n    greyData[i] = greyVal;\n    greyData[i+1] = greyVal;\n    greyData[i+2] = greyVal;\n    greyData[i+3] = baseData[i+3];\n  }\n  greyCtx.putImageData(greyImgData, 0, 0);\n  copyData(greyData, greyDataCopy);\n}\n\nconst getPixelFromXY = function(x, y, data, defaultVal = undefined) {\n  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {\n    return data[(x + y * baseCanvas.width) * 4];\n  } else {\n    return defaultVal;\n  }\n}\n\nconst setPixelFromXY = function(x, y, data, val) {\n  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {\n    const i = (x + y * baseCanvas.width) * 4;\n    data[i] = val.r === undefined ? val : val.r;\n    data[i+1] = val.g === undefined ? val : val.g;\n    data[i+2] = val.b === undefined ? val : val.b;\n    data[i+3] = baseDataCopy[i+3];\n    return true;\n  } else {\n    return false;\n  }\n}\n\nconst getSurroundingPixels = function(x, y) {\n  let defaultVal = getPixelFromXY(x, y, greyDataCopy);\n\n  return {\n    left: getPixelFromXY(x-1, y, greyDataCopy, defaultVal),\n    right: getPixelFromXY(x+1, y, greyDataCopy, defaultVal),\n    up: getPixelFromXY(x, y-1, greyDataCopy, defaultVal),\n    down: getPixelFromXY(x, y+1, greyDataCopy, defaultVal)\n  }\n}\n\n\nconst getGradientMagnitude = function(gradData) {\n  // let gradData = gradientImgData.data;\n\n  for (let x = 0; x < baseCanvas.width; x++) {\n    for (let y = 0; y < baseCanvas.height; y++) {\n      let pixels = getSurroundingPixels(x, y);\n      \n      let diffx = pixels.left - pixels.right;\n      let diffy = pixels.up - pixels.down;\n      let magnitude = Math.sqrt(diffx*diffx + diffy*diffy);\n      let normalized = Math.floor(magnitude * 255/361);\n      setPixelFromXY(x, y, gradData, normalized);\n    }\n  }\n}\n\n\nconst getCoords = function(x, y, matrix) {\n  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {\n    return matrix[y][x];\n  } else {\n    return undefined\n  }\n}\nconst getMinEnergyFromXY = function(x, y, matrix) {\n  const aboveRow = [\n    getCoords(x-1, y-1, matrix),\n    getCoords(x, y-1, matrix),\n    getCoords(x+1, y-1, matrix)\n  ].filter((el) => el !== undefined);\n  return aboveRow.length > 0 ? Math.min(...aboveRow) : 0;\n}\n\nconst getEnergyMatrix = function() {\n  // gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);\n  let energyMatrix = [...Array(baseCanvas.height)].map(e => Array(baseCanvas.width));\n\n  for (let y = 0; y < baseCanvas.height; y++) {\n    for (let x = 0; x < baseCanvas.width; x++) {\n      const currVal = getPixelFromXY(x, y, gradientDataCopy);\n      const minEnergy = getMinEnergyFromXY(x, y, energyMatrix);\n      energyMatrix[y][x] = currVal + minEnergy;\n    }\n  }\n\n  return energyMatrix;\n}\n\nconst getSeam = function() {\n  let energyMatrix = getEnergyMatrix();\n  let seamx = 0\n  let seamy = baseCanvas.height-1;\n  let minVal = energyMatrix[seamy][0];\n\n  for (let i = 1; i < baseCanvas.width; i++) {\n    if (minVal > energyMatrix[seamy][i]) {\n      seamx = i;\n      minVal = energyMatrix[seamy][i];\n    }\n  }\n\n  let seamSet = new Set();\n\n  let baseData = baseImgData.data;\n  while (seamy >= 0) {\n    setPixelFromXY(seamx, seamy, baseData, {r: 255, g: 0, b: 0});\n    seamSet.add([seamy, seamx].toString())\n\n    if (seamy === 0) { break; }\n\n    minVal = energyMatrix[seamy][seamx];\n    let left = energyMatrix[seamy-1][seamx-1]\n    let right = energyMatrix[seamy-1][seamx+1]\n    \n    if (left !== undefined && left < minVal) {\n      seamx = seamx-1;\n      minVal = left;\n    } else if (right !== undefined && right < minVal) {\n      seamx = seamx+1;\n      minVal = right;\n    }\n    seamy--;\n  }\n  baseCtx.putImageData(baseImgData, 0, 0);\n\n  return seamSet;\n}\n\nconst carve = function(data, seamSet) {\n  // const seamSet = getSeam();\n\n  let newData = [];\n  for (let i = 0; i < data.length; i += 4) {\n    let x = (i / 4) % baseCanvas.width;\n    let y = Math.floor((i / 4) / baseCanvas.width);\n    if (!seamSet.has([y,x].toString())) {\n      newData.push(...data.slice(i, i+4));\n    }\n  }\n\n\n  // canvas.width -= 1;\n  // imageData = context.getImageData(0, 0, canvas.width, canvas.height);\n  return newData;\n  // for (let i = 0; i < data.length; i += 1) {\n  //   data[i] = newData[i];\n  // }\n  // context.putImageData(imageData, 0, 0);\n}\n\nconst redraw = function() {\n  baseCanvas.width -= 1;\n  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);\n  baseData = baseImgData.data;\n  for (let i = 0; i < baseData.length; i += 1) {\n    baseData[i] = baseDataCopy[i];\n  }\n  baseCtx.putImageData(baseImgData, 0, 0);\n}\n\nconst carveAll = function(seamSet) {\n  baseDataCopy = carve(baseDataCopy, seamSet);\n  greyDataCopy = carve(greyDataCopy, seamSet);\n  // gradientDataCopy = carve(gradientDataCopy, seamSet);\n  redraw();\n  getGradientMagnitude(gradientDataCopy);\n}\n\nfunction dragElement(elmnt) {\n  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;\n  elmnt.onmousedown = dragMouseDown;\n\n  function dragMouseDown(e) {\n    e = e || window.event;\n    e.preventDefault();\n    startCarving = false;\n    pos3 = e.clientX;\n    pos4 = e.clientY;\n    document.onmouseup = closeDragElement;\n    document.onmousemove = elementDrag;\n  }\n\n  function elementDrag(e) {\n    e = e || window.event;\n    e.preventDefault();\n    pos1 = pos3 - e.clientX;\n    pos2 = pos4 - e.clientY;\n    pos3 = e.clientX;\n    pos4 = e.clientY;\n    // elmnt.style.top = (elmnt.offsetTop - pos2) + \"px\";\n    let newX = elmnt.offsetLeft - pos1;\n    if (newX <= maxRight && newX >= maxLeft) {\n      topTri.style.left = newX + \"px\";\n      botTri.style.left = newX + \"px\";\n    }\n  }\n\n  function closeDragElement() {\n    document.onmouseup = null;\n    document.onmousemove = null;\n    startCarving = true;\n    currVertPos = parseInt(topTri.style.left) - triOffset;\n    seamTimer();\n  }\n}\n\nconst seamTimer = function() {\n  if (baseCanvas.width <= currVertPos || !startCarving) return;\n  const seamSet = getSeam();\n  setTimeout(carveTimer(seamSet), 100)\n}\n\nconst carveTimer = function(seamSet) {\n  return () => {\n    carveAll(seamSet);\n    maxRight = baseCanvas.width + triOffset;\n    setTimeout(seamTimer, 100);\n  }\n}\n\nwindow.addEventListener('load', init);\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });