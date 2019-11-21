var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var centro = {
  x: parseInt(canvas.width / 2),
  y: parseInt(canvas.height / 2 + 100)
}

function main() {
  let planos = [];
  var zbuffer = [];
  initObjs(planos);
  initPlano0(planos[0]);
  initPlano1(planos[1]);
  initPlano2(planos[2]);
  initPlano3(planos[3]);
  initPlano4(planos[4]);
  initPlano5(planos[5]);
  inicializaZbuffer(zbuffer);
  interpolação(planos[0]);
  interpolação(planos[1]);
  interpolação(planos[2]);
  interpolação(planos[3]);
  interpolação(planos[4]);
  interpolação(planos[5]);
  comparaZbuffer(zbuffer, planos[0]);
  comparaZbuffer(zbuffer, planos[1]);
  comparaZbuffer(zbuffer, planos[2]);
  comparaZbuffer(zbuffer, planos[3]);
  comparaZbuffer(zbuffer, planos[4]);
  comparaZbuffer(zbuffer, planos[5]);
  printaZbuffer(zbuffer);
}

function initObjs(planos) {
  for (let i = 0; i < 6; i++) {
    planos[i] = {
      vertices: [],
      pontos: [],
      cor: '',
    }
  }
}

function initPlano0(plano) {
  plano.vertices.push({ x: 0, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 0, z: 0 });
  plano.vertices.push({ x: 0, y: 60, z: 0 });
  plano.vertices.push({ x: 60, y: 60, z: 0 });
  plano.cor = 'green'
}
function initPlano1(plano) {
  plano.vertices.push({ x: 60, y: 0, z: 0 });
  plano.vertices.push({ x: 180, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 0, z: 60 });
  plano.vertices.push({ x: 180, y: 0, z: 60 });
  plano.cor = 'red'
}
function initPlano2(plano) {
  plano.vertices.push({ x: 0, y: 0, z: 0 });
  plano.vertices.push({ x: 0, y: 0, z: 60 });
  plano.vertices.push({ x: 0, y: 240, z: 0 });
  plano.vertices.push({ x: 0, y: 240, z: 60 });
  plano.cor = 'blue'
}
function initPlano3(plano) {
  plano.vertices.push({ x: 60, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 240, z: 0 });
  plano.vertices.push({ x: 60, y: 0, z: 60 });
  plano.vertices.push({ x: 60, y: 240, z: 60 });
  plano.cor = 'yellow'
}
function initPlano4(plano) {
  plano.vertices.push({ x: 120, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 240, z: 0 });
  plano.vertices.push({ x: 120, y: 0, z: 60 });
  plano.vertices.push({ x: 60, y: 240, z: 60 });
  plano.cor = 'ciano'
}
function initPlano5(plano) {
  plano.vertices.push({ x: 0, y: 240, z: 0 });
  plano.vertices.push({ x: 60, y: 240, z: 0 });
  plano.vertices.push({ x: 0, y: 240, z: 60 });
  plano.vertices.push({ x: 60, y: 240, z: 60 });
  plano.cor = 'green'
}

function interpolação(plano) {
  for (let u = 0; u <= 1; u += 0.01) {
    for (let v = 0; v <= 1; v += 0.01) {
      let ponto = {
        x: (1 - u) * (1 - v) * plano.vertices[0].x +
          (1 - u) * v * plano.vertices[1].x +
          u * (1 - v) * plano.vertices[2].x +
          u * v * plano.vertices[3].x,
        y: (1 - u) * (1 - v) * plano.vertices[0].y +
          (1 - u) * v * plano.vertices[1].y +
          u * (1 - v) * plano.vertices[2].y +
          u * v * plano.vertices[3].y,
        z: (1 - u) * (1 - v) * plano.vertices[0].z +
          (1 - u) * v * plano.vertices[1].z +
          u * (1 - v) * plano.vertices[2].z +
          u * v * plano.vertices[3].z,
      }
      plano.pontos.push(ponto);
    }
  }
}

function inicializaZbuffer(zbuffer) {
  for (let x = 0; x < canvas.width; x++) {
    zbuffer[x] = [];
    for (let y = 0; y < canvas.height; y++) {
      zbuffer[x][y] = { zmax: -Infinity, cor: 'black' };
    }
  }
}

function comparaZbuffer(zbuffer, obj) {
  for (let i = 0; i < obj.pontos.length; i++) {
    let ponto = {
      x: parseInt(obj.pontos[i].x),
      y: parseInt(obj.pontos[i].y),
      z: parseInt(obj.pontos[i].z)
    };
    if (ponto.z > zbuffer[ponto.x + centro.x][-ponto.y + centro.y].zmax) {
      zbuffer[ponto.x + centro.x][-ponto.y + centro.y].zmax = ponto.z;
      zbuffer[ponto.x + centro.x][-ponto.y + centro.y].cor = obj.cor;
    }
  }
}

function printaZbuffer(zbuffer) {
  for (let x = 0; x < zbuffer.length; x++) {
    for (let y = 0; y < zbuffer[0].length; y++) {
      ctx.fillStyle = zbuffer[x][y].cor;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  ctx.fillStyle = 'black';
}
