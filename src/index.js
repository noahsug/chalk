import './style.css';
import debounce from 'debounce';

const lineWidth = 8;
const fillWidth = 20;

const root = document.querySelector('.app');

const canvas = document.createElement('canvas');
root.appendChild(canvas);
const ctx = canvas.getContext('2d');
resize();

window.addEventListener('resize', debounce(resize));

function resize() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
  ctx.lineCap = 'round';
  ctx.lineWidth = lineWidth;
  ctx.strokeStyle = 'orange';
  ctx.fillStyle = 'rgba(33, 33, 33, 1)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

const lines = [];

let x = 0;
let y = 0;
let isMouseDown = false;
let line = [];

const stopDrawing = () => {
  if (isMouseDown) {
    isMouseDown = false;
    if (line.length === 1) line.push(line[0]);
  }
};
const startDrawing = (event) => {
  isMouseDown = true;
  [x, y] = [event.offsetX, event.offsetY];
  line = [[x, y]];
  lines.push(line);
};
const drawLine = (event) => {
  if (isMouseDown) {
    const newX = event.offsetX;
    const newY = event.offsetY;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY);
    ctx.stroke();
    [x, y] = [newX, newY];
    line.push([x, y]);
  }
};

function withTouch(fn) {
  return (e) => {
    e.preventDefault();
    const { pageX, pageY } = e.changedTouches[0];
    fn({ offsetX: pageX, offsetY: pageY });
  };
}

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', drawLine);
canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);
canvas.addEventListener('touchstart', withTouch(startDrawing));
canvas.addEventListener('touchmove', withTouch(drawLine));
canvas.addEventListener('touchend', withTouch(stopDrawing));

window.requestAnimationFrame(draw);
function draw() {
  ctx.save();
  ctx.fillStyle = 'rgba(33, 33, 33, 0.01)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.restore();

  ctx.save();
  lines.forEach((line, i) => {
    const rgb = [211, 211, 211];
    ctx.strokeStyle = `rgb(${rgb.join(',')})`;
    line.forEach(([x, y], i) => {
      x += fillWidth / 2 - Math.random() * fillWidth;
      y += fillWidth / 2 - Math.random() * fillWidth;
      if (i !== 0) {
        ctx.lineTo(x, y);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.moveTo(x, y);
    });
  });
  ctx.restore();

  window.requestAnimationFrame(draw);
}
