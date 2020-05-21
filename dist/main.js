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

eval("let baseCanvas;\nlet baseCtx;\nlet baseImgData;\n\nlet greyCanvas;\nlet greyCtx;\nlet greyImgData;\n\nlet gradientCanvas;\nlet gradientCtx;\nlet gradientImgData;\n\nconst init = function() {\n  let image = document.getElementById('source-image');\n\n  baseCanvas = document.getElementById('base-canvas');\n  baseCtx = baseCanvas.getContext('2d');\n  baseImgData = baseCtx.getImageData(0, 0, baseCanvas.width, baseCanvas.height);\n\n  greyCanvas = document.getElementById('grey-canvas');\n  greyCtx = greyCanvas.getContext('2d');\n  greyImgData = greyCtx.getImageData(0, 0, greyCanvas.width, greyCanvas.height);\n\n  gradientCanvas = document.getElementById('gradient-canvas');\n  gradientCtx = gradientCanvas.getContext('2d');\n  gradientImgData = gradientCtx.getImageData(0, 0, gradientCanvas.width, gradientCanvas.height);\n\n  // canvas = document.getElementById('canvas');\n  // c = canvas.getContext('2d');\n  // let imageData = c.getImageData(0, 0, canvas.width, canvas.height);\n  // console.log(image)\n  // let image = new Image();\n  // image.onload = function () {\n  //   drawImage(image);\n  // }\n  // image.src = 'image.jpg';\n\n  baseCanvas.width = image.width;\n  baseCanvas.height = image.height;\n\n  greyCanvas.width = image.width;\n  greyCanvas.height = image.height;\n\n  gradientCanvas.width = image.width;\n  gradientCanvas.height = image.height;\n\n  drawImage(image);\n  getGreyScale();\n  console.log(getSurroundingPixels(canvas.width-1, canvas.height-2))\n};\n\nconst drawImage = function(image) {\n  baseCtx.drawImage(image, 0, 0);\n};\n\n\n\n\nconst carve = function() {\n  let imageData = c.getImageData(0, 0, canvas.width, canvas.height);\n  let data = imageData.data;\n  for (let i = 0; i < data.length; i += 4) {\n    data[i] = 55;\n  }\n  c.putImageData(imageData, 0, 0);\n}\n\nconst getGreyScale = function() {\n  let data = baseImgData.data;\n  for (let i = 0; i < data.length; i += 4) {\n    let greyVal = 0.2 * data[i] + 0.72 * data[i+1] + 0.07 * data[i+2];\n    data[i] = greyVal;\n    data[i+1] = greyVal;\n    data[i+2] = greyVal;\n  }\n  greyCtx.putImageData(baseImgData, 0, 0);\n}\n\nconst getPixelFromXY = function(x, y, imageData, defaultVal = undefined) {\n  if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {\n    return imageData.data[(x + y * canvas.width) * 4];\n  } else {\n    return defaultVal;\n  }\n}\n\nconst setPixelFromXY = function(x, y, imageData, defaultVal = undefined) {\n  if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {\n    return imageData.data[(x + y * canvas.width) * 4];\n  } else {\n    return defaultVal;\n  }\n}\n\nconst getSurroundingPixels = function(x, y) {\n  let defaultVal = getPixelFromXY(x, y, greyImgData);\n\n  return {\n    left: getPixelFromXY(x-1, y, greyImgData, defaultVal),\n    right: getPixelFromXY(x+1, y, greyImgData, defaultVal),\n    up: getPixelFromXY(x, y-1, greyImgData, defaultVal),\n    down: getPixelFromXY(x, y+1, greyImgData, defaultVal)\n  }\n\n}\n\n\nconst getGradientMagnitude = function() {\n  let data = greyImgData.data;\n\n  for (let x = 0; x < canvas.width; x++) {\n    for (let y = 0; y < canvas.height; y++) {\n      let pixels = getSurroundingPixels(x, y);\n\n      let diffx = pixels.left - pixels.right;\n      let diffy = pixels.up - pixels.down;\n      let magnitude = Math.sqrt(diffx*diffx + diffy*diffy);\n      let normalized = magnitude * 255/361;\n    }\n  }\n}\n\nwindow.addEventListener('load', init);\n// document.addEventListener(\"DOMContentLoaded\", () => {\n//   let img = document.getElementById('image');\n\n//   let canvas = document.getElementById('canvas');\n//   let c = canvas.getContext('2d');\n\n\n//   drawImage(image, canvas, c);\n//   carve(canvas, c);\n// });\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });