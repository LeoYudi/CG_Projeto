var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));



ctx.fillRect(100, 100, 100);
ctx.fillRect(200, 100, 100);
ctx.fillRect(100, 200, 100);
ctx.fillRect(200, 200, 100);



/*
100, 100, 100
200, 100, 100
100, 200, 100
200, 200, 100
100, 100, 200
200, 100, 200
100, 200, 200
200, 200, 200
150, 100, 250
150, 200, 250 */