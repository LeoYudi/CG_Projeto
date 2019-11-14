var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var obj1 = {
  cor: 'blue',
  pontos: []
};

var obj2 = {
  cor: 'red',
  pontos: []
};

var obj3 = {
  cor: 'yellow',
  pontos: []
};

var obj4 = {
  cor: 'verde',
  pontos: []
};

var obj5 = {
  cor: 'branco',
  pontos: []
};

function inicializaZbuffer() {
  for (let x = 0; x < canvas.width; x++) {
    zbuffer[x] = [];
    for (let y = 0; y < canvas.height; y++) {
      zbuffer[x][y] = { zmax: -Infinity, cor: 'black' };
    }
  }
}

function comparaZbuffer(obj) {
  let novaCor = [];
  for (let i = 0; i < obj.pontos.length; i++) {
    if (obj.pontos[i].z > zbuffer[obj.pontos[i].x][obj.pontos[i].y].zmax) {
      zbuffer[obj.pontos[i].x][obj.pontos[i].y].zmax = obj.pontos[i].z;
      // novaCor = iluminaçãoPonto(obj.pontos[i], obj.cor);
      novaCor = iluminaçãoPontoEspecular(obj.pontos[i], obj.cor);
      zbuffer[obj.pontos[i].x][obj.pontos[i].y].cor = `RGB(${novaCor[0]}, ${novaCor[1]}, ${novaCor[2]})`;
    }
  }
}

function printaZbuffer() {
  for (let x = 0; x < zbuffer.length; x++) {
    for (let y = 0; y < zbuffer[0].length; y++) {
      ctx.fillStyle = zbuffer[x][y].cor;
      ctx.fillRect(x, y, 1, 1);
      if (zbuffer[x][y].cor !== 'black') {

      }
    }
  }
  ctx.fillStyle = 'black';
}