import debounce from 'debounce';
import './style.css';
import { encode, decode } from './encoder';

const lineWidth = 8;
const fillWidth = 20;

const root = document.querySelector('.app');

const canvas = document.createElement('canvas');
root.appendChild(canvas);
const ctx = canvas.getContext('2d');
init();

const lines = [];

let x = 0;
let y = 0;
let isMouseDown = false;
let line = [];
let lastClick = 0;

const linesToReplay = decode(window.location.hash, canvas);
let replaying = true;
let hash = window.location.hash;
let updateHashInterval = 0;

let nextAction = 0;

window.addEventListener('resize', debounce(resize));

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

const onClick = () => {
  if (!replaying && line.length > 2) return;
  const dblClickTime = Date.now() - lastClick;
  lastClick = Date.now();
  if (dblClickTime < 300) {
    clearInterval(updateHashInterval);
    window.location.hash = '';
    location.reload();
  }
};

canvas.addEventListener('mouseup', onClick);
canvas.addEventListener('touchend', withTouch(onClick));

function distance([x, y], [x2, y2]) {
  return (x2 - x) * (x2 - x) + (y2 - y) * (y2 - y);
}

function shortenLine(line) {
  if (line.length === 1) return;
  const newLine = [line[0]];
  for (let i = 1; i < line.length; i++) {
    const p = newLine[newLine.length - 1];
    const p2 = line[i];
    if (distance(p, p2) > 500) {
      newLine.push(p2);
    }
  }
  if (distance(line[0], line[line.length - 1]) > 100) {
    if (newLine.length === 1) {
      newLine.push(line[line.length - 1]);
    } else {
      newLine[newLine.length - 1] = line[line.length - 1];
    }
  }
  lines[lines.length - 1] = newLine;
  console.log(line.length - newLine.length);
}

const stopDrawing = () => {
  if (isMouseDown) {
    isMouseDown = false;
    shortenLine(line);
  }
};
const startDrawing = (newX, newY) => {
  isMouseDown = true;
  [x, y] = [newX, newY];
  line = [[x, y]];
  lines.push(line);
};
const drawLine = (newX, newY) => {
  if (isMouseDown) {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY);
    ctx.stroke();
    [x, y] = [newX, newY];
    line.push([x, y]);
  }
};

function withMouse(fn) {
  return (e) => {
    const { offsetX, offsetY } = e;
    fn(offsetX, offsetY);
  };
}

function withTouch(fn) {
  return (e) => {
    e.preventDefault();
    const { pageX, pageY } = e.changedTouches[0];
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

  updateHashInterval = setInterval(() => {
    window.location.hash = encode(lines, canvas);
    hash = window.location.hash;
  }, 300);
}

window.addEventListener('hashchange', (e) => {
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

  const [x, y] = linesToReplay[0].shift();
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

function drawLineSegment([x, y], i) {
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
  lines.forEach((line, i) => {
    const rgb = [211, 211, 211];
    ctx.strokeStyle = `rgb(${rgb.join(',')})`;
    line.forEach(drawLineSegment);
    if (line.length === 1) drawLineSegment(line[0], 1);
  });
  ctx.restore();

  window.requestAnimationFrame(draw);
}
window.requestAnimationFrame(draw);
