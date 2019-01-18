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
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/**
 * Returns a function, that, as long as it continues to be invoked, will not
 * be triggered. The function will be called after it stops being called for
 * N milliseconds. If `immediate` is passed, trigger the function on the
 * leading edge, instead of the trailing. The function also has a property 'clear' 
 * that is a function which will clear the timer to prevent previously scheduled executions. 
 *
 * @source underscore.js
 * @see http://unscriptable.com/2009/03/20/debouncing-javascript-methods/
 * @param {Function} function to wrap
 * @param {Number} timeout in ms (`100`)
 * @param {Boolean} whether to execute at the beginning (`false`)
 * @api public
 */
function debounce(func, wait, immediate){
  var timeout, args, context, timestamp, result;
  if (null == wait) wait = 100;

  function later() {
    var last = Date.now() - timestamp;

    if (last < wait && last >= 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      if (!immediate) {
        result = func.apply(context, args);
        context = args = null;
      }
    }
  };

  var debounced = function(){
    context = this;
    args = arguments;
    timestamp = Date.now();
    var callNow = immediate && !timeout;
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };

  debounced.clear = function() {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
  };
  
  debounced.flush = function() {
    if (timeout) {
      result = func.apply(context, args);
      context = args = null;
      
      clearTimeout(timeout);
      timeout = null;
    }
  };

  return debounced;
};

// Adds compatibility for ES modules
debounce.debounce = debounce;

module.exports = debounce;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/debounce/index.js
var debounce = __webpack_require__(0);
var debounce_default = /*#__PURE__*/__webpack_require__.n(debounce);

// EXTERNAL MODULE: ./src/style.css
var style = __webpack_require__(1);

// CONCATENATED MODULE: ./src/encoder.js
function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// base 64 alphabet
var alphabet = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '-', '.'];
function encode(lines, _ref) {
  var width = _ref.width,
      height = _ref.height;
  if (lines.length === 0) return '';
  var r = 126 / Math.max(width, height);
  var flatLines = [Math.round(width * r), Math.round(height * r)];
  lines.forEach(function (line, i) {
    line.forEach(function (p) {
      p.forEach(function (v) {
        flatLines.push(Math.max(Math.round(v * r), 1));
      });
    }); // 127 means end of a line

    if (i !== lines.length - 1) flatLines.push(127);
  });
  return encodeBase128ToBase64(flatLines);
}
function decode(str, _ref2) {
  var width = _ref2.width,
      height = _ref2.height;
  if (str.length === 0) return [];

  var _decodeBase64ToBase = decodeBase64ToBase128(str),
      _decodeBase64ToBase2 = _toArray(_decodeBase64ToBase),
      decodedWidth = _decodeBase64ToBase2[0],
      decodedHeight = _decodeBase64ToBase2[1],
      flatLines = _decodeBase64ToBase2.slice(2);

  var r = Math.min(width / decodedWidth, height / decodedHeight);
  var widthOffset = (width - decodedWidth * r) / 2;
  var heightOffset = (height - decodedHeight * r) / 2;
  var result = [[]];
  var addingX = true;
  flatLines.forEach(function (v) {
    if (v === 127) {
      result.push([]);
      return;
    }

    var line = result[result.length - 1];

    if (addingX) {
      line.push([Math.round(widthOffset + v * r), Math.round(heightOffset)]);
    } else {
      line[line.length - 1][1] = Math.round(heightOffset + v * r);
    }

    addingX = !addingX;
  });
  return result;
}

function encodeBase128ToBase64(values) {
  var result = '';
  var base10 = 0;
  var shift = 0;
  values.forEach(function (v) {
    base10 += v << shift;
    shift += 7;

    while (shift >= 6) {
      var charValue = base10 & 63;
      result += alphabet[charValue];
      base10 >>>= 6;
      shift -= 6;
    }
  });

  if (base10 > 0) {
    var charValue = base10 & 63;
    result += alphabet[charValue];
  }

  return result;
}

function decodeBase64ToBase128(str) {
  var result = [];
  var shift = 0;
  var base10 = 0;

  for (var i = 0; i < str.length; i++) {
    var char = str[i];
    base10 += alphabet.indexOf(char) << shift;
    shift += 6;

    if (shift >= 7) {
      result.push(base10 & 127);
      base10 >>>= 7;
      shift -= 7;
    }
  }

  if (base10 > 0) {
    result.push(base10 & 127);
  }

  return result;
}
// CONCATENATED MODULE: ./src/index.js
function _slicedToArray(arr, i) { return src_arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || src_nonIterableRest(); }

function src_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function src_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var lineWidth = 8;
var fillWidth = 20;
var root = document.querySelector('.app');
var canvas = document.createElement('canvas');
root.appendChild(canvas);
var ctx = canvas.getContext('2d');
init();
var lines = [];
var x = 0;
var y = 0;
var isMouseDown = false;
var line = [];
var lastClick = 0;
var linesToReplay = decode(window.location.hash.slice(1), canvas);
var replaying = true;
var hash = window.location.hash;
var updateHashInterval = 0;
var nextAction = 0;
window.addEventListener('resize', debounce_default()(resize));

function init() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  ctx.lineCap = 'round';
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = 'orange';
  ctx.fillStyle = 'rgba(33, 33, 33, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function resize() {
  if (replaying) {
    location.reload();
  } else {
    init();
  }
}

var onClick = function onClick() {
  if (!replaying && line.length > 2) return;
  var dblClickTime = Date.now() - lastClick;
  lastClick = Date.now();

  if (dblClickTime < 300) {
    clearInterval(updateHashInterval);
    window.location.hash = '';
    location.reload();
  }
};

canvas.addEventListener('mouseup', onClick);
canvas.addEventListener('touchend', withTouch(onClick));

function distance(_ref, _ref2) {
  var _ref3 = _slicedToArray(_ref, 2),
      x = _ref3[0],
      y = _ref3[1];

  var _ref4 = _slicedToArray(_ref2, 2),
      x2 = _ref4[0],
      y2 = _ref4[1];

  return Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));
}

function slope(_ref5, _ref6) {
  var _ref7 = _slicedToArray(_ref5, 2),
      x = _ref7[0],
      y = _ref7[1];

  var _ref8 = _slicedToArray(_ref6, 2),
      x2 = _ref8[0],
      y2 = _ref8[1];

  var m = (y - y2) / (x - x2);
}

function shortenLine(line) {
  if (line.length === 1) return;
  var reducedLine = [line[0]];

  for (var i = 1; i < line.length; i += 1) {
    var p = reducedLine[reducedLine.length - 1];
    var p2 = line[i];

    if (distance(p, p2) > 20) {
      reducedLine.push(p2);
    }
  }

  var deslopedLine = [reducedLine[0]];
  var lastAdded = 0;

  for (var _i2 = 2; _i2 < reducedLine.length; _i2 += 1) {
    for (var j = lastAdded + 1; j < _i2; j += 1) {
      var _p = deslopedLine[deslopedLine.length - 1];
      var _p2 = reducedLine[j];
      var p3 = reducedLine[_i2];
      var d2 = distance(_p, _p2);
      var d3 = distance(_p, p3);
      var projectedX = _p[0] + (p3[0] - _p[0]) * (d2 / d3);
      var projectedY = _p[1] + (p3[1] - _p[1]) * (d2 / d3);

      if (d3 < d2 || distance([projectedX, projectedY], _p2) > 5) {
        deslopedLine.push(reducedLine[_i2 - 1]);
        lastAdded = _i2 - 1;
        break;
      }
    }
  }

  deslopedLine.push(reducedLine[reducedLine.length - 1]);

  if (distance(line[0], line[line.length - 1]) > 10) {
    if (deslopedLine.length === 1) {
      deslopedLine.push(line[line.length - 1]);
    } else {
      deslopedLine[deslopedLine.length - 1] = line[line.length - 1];
    }
  }

  lines[lines.length - 1] = deslopedLine;
}

var stopDrawing = function stopDrawing() {
  if (isMouseDown) {
    isMouseDown = false;
    shortenLine(line);
  }
};

var startDrawing = function startDrawing(newX, newY) {
  isMouseDown = true;
  x = newX;
  y = newY;
  line = [[x, y]];
  lines.push(line);
};

var drawLine = function drawLine(newX, newY) {
  if (isMouseDown) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY);
    ctx.stroke();
    x = newX;
    y = newY;
    line.push([x, y]);
  }
};

function withMouse(fn) {
  return function (e) {
    var offsetX = e.offsetX,
        offsetY = e.offsetY;
    fn(offsetX, offsetY);
  };
}

function withTouch(fn) {
  return function (e) {
    e.preventDefault();
    e.stopPropagation();
    var _e$changedTouches$ = e.changedTouches[0],
        pageX = _e$changedTouches$.pageX,
        pageY = _e$changedTouches$.pageY;
    fn(pageX, pageY);
  };
}

function listenToInput() {
  canvas.addEventListener('mousedown', withMouse(startDrawing));
  canvas.addEventListener('mousemove', withMouse(drawLine));
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);
  canvas.addEventListener('touchstart', withTouch(startDrawing));
  canvas.addEventListener('touchmove', withTouch(drawLine));
  canvas.addEventListener('touchend', withTouch(stopDrawing));
  updateHashInterval = setInterval(function () {
    if (isMouseDown) return;
    window.location.hash = encode(lines, canvas);
    hash = window.location.hash;
  }, 300);
}

window.addEventListener('hashchange', function (e) {
  if (window.location.hash !== hash) {
    location.reload();
  }
});

function replayLines() {
  if (!replaying) return;

  if (linesToReplay.length === 0) {
    replaying = false;
    listenToInput();
    return;
  }

  nextAction -= 1;
  if (nextAction > 0) return;

  var _linesToReplay$0$shif = linesToReplay[0].shift(),
      _linesToReplay$0$shif2 = _slicedToArray(_linesToReplay$0$shif, 2),
      x = _linesToReplay$0$shif2[0],
      y = _linesToReplay$0$shif2[1];

  if (isMouseDown) {
    drawLine(x, y);
  } else {
    startDrawing(x, y);
  }

  nextAction = 1;

  if (linesToReplay[0].length === 0) {
    linesToReplay.shift();
    stopDrawing();
    nextAction = 12;
  }
}

function drawLineSegment(_ref9, i) {
  var _ref10 = _slicedToArray(_ref9, 2),
      x = _ref10[0],
      y = _ref10[1];

  x += fillWidth / 2 - Math.random() * fillWidth;
  y += fillWidth / 2 - Math.random() * fillWidth;

  if (i !== 0) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  ctx.beginPath();
  ctx.moveTo(x, y);
}

function draw() {
  replayLines();
  ctx.save();
  ctx.fillStyle = 'rgba(33, 33, 33, 0.01)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
  ctx.save();
  lines.forEach(function (line, i) {
    var rgb = [211, 211, 211];
    ctx.strokeStyle = "rgb(".concat(rgb.join(','), ")");
    line.forEach(drawLineSegment);
    if (line.length === 1) drawLineSegment(line[0], 1);
  });
  ctx.restore();
  window.requestAnimationFrame(draw);
}

window.requestAnimationFrame(draw);

/***/ })
/******/ ]);