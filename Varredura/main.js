var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var canvas2 = document.getElementById('canvas2');
var ctx2 = canvas2.getContext('2d');
var painting2 = document.getElementById('paint');
var paint_style2 = getComputedStyle(painting2);
canvas2.width = parseInt(paint_style2.getPropertyValue('width'));
canvas2.height = parseInt(paint_style2.getPropertyValue('height'));

var centro = {
  x: parseInt(canvas.width / 2),
  y: parseInt(canvas.height / 2)
}

var mouse = { x: 0, y: 0 }

function main() {
  canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  }, false);

  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  canvas.addEventListener('mousedown', function (e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);

    canvas.addEventListener('mousemove', onPaint, false);
  }, false);

  canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', onPaint, false);
  }, false);

  var onPaint = function () {
    ctx.lineTo(mouse.x, mouse.y);
    ctx.stroke();
  };
}