var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var esfera = {
  centro: [200, 500],
  pontos: [],
  raio: 50
}

var plano = {
  inicio: [0, 0, 0],
  fim: [100, 100, 0],
  pontos: []
}

function main() {
  pontosEsfera();
  pontosPlano();
  printa(plano.pontos, 'blue');
  printa(esfera.pontos, 'magenta');
}

function printa(pontos, cor) {
  for (let i = 0; i < pontos.length; i++) {
    ctx.fillStyle = cor;
    ctx.fillRect(pontos[i][0] + 500, pontos[i][1] + 200, 1, 1);
  }
}

function pontosEsfera() {
  for (let a = -Math.PI / 2; a < Math.PI / 2; a += 0.02) {
    for (let b = -Math.PI; b < Math.PI; b += 0.02) {
      let coord = [];
      coord[0] = esfera.raio * Math.cos(a) * Math.cos(b);
      coord[1] = esfera.raio * Math.cos(a) * Math.sin(b);
      coord[2] = esfera.raio * Math.sin(a);
      esfera.pontos.push(coord);
    }
  }
}

function pontosPlano() {
  for (let i = plano.inicio[0]; i < plano.fim[0]; i += 0.1)
    for (let j = plano.inicio[1]; j < plano.fim[1]; j += 0.1)
      plano.pontos.push([i, j, 0]);
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