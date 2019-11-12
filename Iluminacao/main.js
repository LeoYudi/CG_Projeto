var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var esfera = {
  centro: [200, 500],
  pontos: [],
  raio: 50,
  cor: 'magenta'
}

var plano = {
  inicio: [0, 0, 0],
  fim: [100, 100, 0],
  pontos: [],
  cor: 'blue'
}

var zbuffer = [];

function main() {
  pontosEsfera();
  pontosPlano();
  inicializaZbuffer();
  console.log(plano);
  // printa(plano.pontos, plano.cor);
  // printa(esfera.pontos, esfera.cor);
  comparaZbuffer(esfera);
  comparaZbuffer(plano);
  printaZbuffer();
}

function pontosEsfera() {
  for (let a = -Math.PI / 2; a < Math.PI / 2; a += 0.02) {
    for (let b = -Math.PI; b < Math.PI; b += 0.02) {
      let coord = { x: 0, y: 0, z: 0 };
      coord.x = Math.round(esfera.raio * Math.cos(a) * Math.cos(b) + canvas.width / 2);
      coord.y = Math.round(esfera.raio * Math.cos(a) * Math.sin(b) + canvas.height / 2);
      coord.z = Math.round(esfera.raio * Math.sin(a));
      esfera.pontos.push(coord);
    }
  }
}

function pontosPlano() {
  for (let i = plano.inicio[0]; i < plano.fim[0]; i++)
    for (let j = plano.inicio[1]; j < plano.fim[1]; j++)
      plano.pontos.push({ x: Math.round(i + canvas.width / 2), y: Math.round(j + canvas.height / 2), z: 0 });
}

function inicializaZbuffer() {
  for (let x = 0; x < canvas.width; x++) {
    zbuffer[x] = [];
    for (let y = 0; y < canvas.height; y++) {
      zbuffer[x][y] = { zmax: Infinity, cor: 'black' };
    }
  }
}

function comparaZbuffer(obj) {
  for (let i = 0; i < obj.pontos.length; i++) {
    if (obj.pontos[i].z < zbuffer[obj.pontos[i].x][obj.pontos[i].y].zmax) {
      zbuffer[obj.pontos[i].x][obj.pontos[i].y].zmax = obj.pontos[i].z;
      zbuffer[obj.pontos[i].x][obj.pontos[i].y].cor = obj.cor;
    }
  }
}

function printa(pontos, cor) {
  ctx.fillStyle = cor;
  for (let i = 0; i < pontos.length; i++) {
    ctx.fillRect(pontos[i].x, pontos[i].y, 1, 1);
  }
}

function printaZbuffer() {
  for (let x = 0; x < zbuffer.length; x++) {
    for (let y = 0; y < zbuffer[0].length; y++) {
      ctx.fillStyle = zbuffer[x][y].cor;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  ctx.fillStyle = 'black';
}

// function multiPontoMatriz(ponto, matriz) {
//   let result = [];
//   for (j = 0; j < matriz[0].length; j++) {
//     result[j] = 0;
//     for (k = 0; k < matriz.length; k++) {
//       result[j] += ponto[k] * matriz[k][j];
//     }
//   }
//   return result;
// }

// function projCabinet(obj) {
//   projecaoPontos = [[]];
//   let i;
//   let matrizProj = [[1, 0, 0, 0], [0, 1, 0, 0], [0.4477 / 2, 0.8941 / 2, 0, 0], [0, 0, 0, 1]];
//   for (i = 0; i < obj.pontos.length; i++) {
//     projecaoPontos.push(multiPontoMatriz(obj.pontos[i], matrizProj));
//   }
//   return projecaoPontos;
// }