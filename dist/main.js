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

eval("let baseCanvas;\nlet baseCtx;\nlet baseImgData;\n\nlet greyCanvas;\nlet greyCtx;\nlet greyImgData;\n\nlet gradientCanvas;\nlet gradientCtx;\nlet gradientImgData;\n\nconst init = function() {\n  let image = document.getElementById('source-image');\n\n  baseCanvas = document.getElementById('base-canvas');\n  baseCtx = baseCanvas.getContext('2d');\n  baseCanvas.width = image.width;\n  baseCanvas.height = image.height;\n\n  greyCanvas = document.getElementById('grey-canvas');\n  greyCtx = greyCanvas.getContext('2d');\n  greyCanvas.width = image.width;\n  greyCanvas.height = image.height;\n\n  gradientCanvas = document.getElementById('gradient-canvas');\n  gradientCtx = gradientCanvas.getContext('2d');\n  gradientCanvas.width = image.width;\n  gradientCanvas.height = image.height;\n\n  drawImage(image);\n\n  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);\n  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);\n  \n  getGreyScale();\n  console.log(greyCanvas.width-1);\n  console.log(getSurroundingPixels(greyCanvas.width-1, greyCanvas.height-2))\n  getGradientMagnitude();\n  carve(baseImgData, baseCtx);\n  // getSeam();\n  // let s = new Set();\n  // s.add([1,2].toString())\n  // console.log([1,2].toString())\n  // console.log(s.has([1,2].toString()));\n  \n\n  // canvas = document.getElementById('canvas');\n  // c = canvas.getContext('2d');\n  // let imageData = c.getImageData(0, 0, canvas.width, canvas.height);\n  // console.log(image)\n  // let image = new Image();\n  // image.onload = function () {\n  //   drawImage(image);\n  // }\n  // image.src = 'image.jpg';\n};\n\nconst drawImage = function(image) {\n  baseCtx.drawImage(image, 0, 0);\n};\n\n// const carve = function() {\n//   let imageData = c.getImageData(0, 0, canvas.width, canvas.height);\n//   let data = imageData.data;\n//   for (let i = 0; i < data.length; i += 4) {\n//     data[i] = 55;\n//   }\n//   c.putImageData(imageData, 0, 0);\n// }\n\nconst getGreyScale = function() {\n  greyImgData = greyCtx.getImageData(0, 0, greyCanvas.width, greyCanvas.height);\n  let baseData = baseImgData.data;\n  let greyData = greyImgData.data;\n  for (let i = 0; i < baseData.length; i += 4) {\n    let greyVal = 0.2 * baseData[i] + 0.72 * baseData[i+1] + 0.07 * baseData[i+2];\n    // let greyVal = (baseData[i] + baseData[i+1] + baseData[i+2]) / 3;\n    greyData[i] = greyVal;\n    greyData[i+1] = greyVal;\n    greyData[i+2] = greyVal;\n    greyData[i+3] = baseData[i+3];\n  }\n  greyCtx.putImageData(greyImgData, 0, 0);\n}\n\nconst getPixelFromXY = function(x, y, imageData, defaultVal = undefined) {\n  if (x >= 0 && x < greyCanvas.width && y >= 0 && y < greyCanvas.height) {\n    return imageData.data[(x + y * greyCanvas.width) * 4];\n  } else {\n    return defaultVal;\n  }\n}\n\nconst setPixelFromXY = function(x, y, data, val) {\n  if (x >= 0 && x < greyCanvas.width && y >= 0 && y < greyCanvas.height) {\n    const i = (x + y * greyCanvas.width) * 4;\n    data[i] = val.r === undefined ? val : val.r;\n    data[i+1] = val.g === undefined ? val : val.g;\n    data[i+2] = val.b === undefined ? val : val.b;\n    data[i+3] = greyImgData.data[i+3];\n    return true;\n  } else {\n    return false;\n  }\n}\n\nconst getSurroundingPixels = function(x, y) {\n  let defaultVal = getPixelFromXY(x, y, greyImgData);\n\n  return {\n    left: getPixelFromXY(x-1, y, greyImgData, defaultVal),\n    right: getPixelFromXY(x+1, y, greyImgData, defaultVal),\n    up: getPixelFromXY(x, y-1, greyImgData, defaultVal),\n    down: getPixelFromXY(x, y+1, greyImgData, defaultVal)\n  }\n}\n\n\nconst getGradientMagnitude = function() {\n  let gradData = gradientImgData.data;\n\n  for (let x = 0; x < greyCanvas.width; x++) {\n    for (let y = 0; y < greyCanvas.height; y++) {\n      let pixels = getSurroundingPixels(x, y);\n      \n      let diffx = pixels.left - pixels.right;\n      let diffy = pixels.up - pixels.down;\n      let magnitude = Math.sqrt(diffx*diffx + diffy*diffy);\n      let normalized = Math.floor(magnitude * 255/361);\n      setPixelFromXY(x, y, gradData, normalized);\n    }\n  }\n  gradientCtx.putImageData(gradientImgData, 0, 0);\n}\n\n\nconst getCoords = function(x, y, matrix) {\n  if (x >= 0 && x < baseCanvas.width && y >= 0 && y < baseCanvas.height) {\n    return matrix[y][x];\n  } else {\n    return undefined\n  }\n}\nconst getMinEnergyFromXY = function(x, y, matrix) {\n  const aboveRow = [\n    getCoords(x-1, y-1, matrix),\n    getCoords(x, y-1, matrix),\n    getCoords(x+1, y-1, matrix)\n  ].filter((el) => el !== undefined);\n  return aboveRow.length > 0 ? Math.min(...aboveRow) : 0;\n}\n\nconst getEnergyMatrix = function() {\n  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);\n  let energyMatrix = [...Array(baseCanvas.height)].map(e => Array(baseCanvas.width));\n\n  for (let y = 0; y < baseCanvas.height; y++) {\n    for (let x = 0; x < baseCanvas.width; x++) {\n      const currVal = getPixelFromXY(x, y, gradientImgData);\n      const minEnergy = getMinEnergyFromXY(x, y, energyMatrix);\n      energyMatrix[y][x] = currVal + minEnergy;\n    }\n  }\n\n  return energyMatrix;\n}\n\nconst getSeam = function() {\n  let energyMatrix = getEnergyMatrix();\n  let seamx = 0\n  let seamy = baseCanvas.height-1;\n  let minVal = energyMatrix[seamy][0];\n\n  for (let i = 1; i < baseCanvas.width; i++) {\n    if (minVal > energyMatrix[seamy][i]) {\n      seamx = i;\n      minVal = energyMatrix[seamy][i];\n    }\n  }\n\n  // console.log(minVal)\n  // console.log(energyMatrix[seamy][9])\n  // console.log(energyMatrix[1][0]);\n  // console.log(energyMatrix[1][1]);\n  // console.log(energyMatrix[2][0]);\n  // console.log(energyMatrix[0].slice(0,7));\n  // console.log(energyMatrix[1].slice(0,7));\n  // console.log(energyMatrix[2].slice(0,7));\n  // console.log(energyMatrix[seamy].slice(0,7));\n  // console.log(getPixelFromXY(0,3,gradientImgData));\n  let seamSet = new Set();\n\n  let baseData = baseImgData.data;\n  while (seamy >= 0) {\n    setPixelFromXY(seamx, seamy, baseData, {r: 255, g: 0, b: 0});\n    seamSet.add([seamy, seamx].toString())\n\n    if (seamy === 0) { break; }\n\n    minVal = energyMatrix[seamy][seamx];\n    let left = energyMatrix[seamy-1][seamx-1]\n    let right = energyMatrix[seamy-1][seamx+1]\n    \n    if (left !== undefined && left < minVal) {\n      seamx = seamx-1;\n      minVal = left;\n    } else if (right !== undefined && right < minVal) {\n      seamx = seamx+1;\n      minVal = right;\n    }\n    seamy--;\n  }\n  baseCtx.putImageData(baseImgData, 0, 0);\n\n  return seamSet;\n}\n\nconst carve = function(imageData, context) {\n  const seamSet = getSeam();\n\n  let data = imageData.data;\n  let newData = [];\n  for (let i = 0; i < data.length; i += 4) {\n    let x = (i / 4) % baseCanvas.width;\n    let y = Math.floor((i / 4) / baseCanvas.width);\n    if (!seamSet.has([y,x].toString())) {\n      newData.push(...data.slice(i, i+4));\n    }\n  }\n\n  baseCanvas.width -= 1;\n  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);\n  let baseData = baseImgData.data;\n  for (let i = 0; i < baseData.length; i += 1) {\n    baseData[i] = newData[i];\n  }\n  baseCtx.putImageData(baseImgData, 0, 0);\n}\n\nwindow.addEventListener('load', init);\n// document.addEventListener(\"DOMContentLoaded\", () => {\n//   let img = document.getElementById('image');\n\n//   let canvas = document.getElementById('canvas');\n//   let c = canvas.getContext('2d');\n\n\n//   drawImage(image, canvas, c);\n//   carve(canvas, c);\n// });\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });