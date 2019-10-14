var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var inicio = { x: 0, y: 0 };
var fim = { x: 0, y: 0 };

var obj = {
  pontos: [
    [100, 100, 100, 1],
    [200, 100, 100, 1],
    [100, 200, 100, 1],
    [200, 200, 100, 1],
    [100, 100, 200, 1],
    [200, 100, 200, 1],
    [100, 200, 200, 1],
    [200, 200, 200, 1],
    [150, 100, 250, 1],
    [150, 200, 250, 1]
  ],
  retas: [
    [0, 1],
    [1, 3],
    [2, 3],
    [2, 0],
    [4, 5],
    [5, 7],
    [6, 7],
    [6, 4],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
    [4, 8],
    [8, 5],
    [6, 9],
    [9, 7],
    [8, 9]
  ],
};

function main() {
  // let proj = projecao(obj);
  let proj = projCabinet(obj);
  // let proj = projCavaleira(obj);

  for (let i = 0; i < obj.retas.length; i++) {
    inicio.x = proj[obj.retas[i][0] + 1][0][0];
    inicio.y = proj[obj.retas[i][0] + 1][0][1];
    fim.x = proj[obj.retas[i][1] + 1][0][0];
    fim.y = proj[obj.retas[i][1] + 1][0][1];
    bresenhamLinha(inicio, fim);
  }
}

function projecao(obj) {
  projecaoPontos = [[]];
  let i;
  let matrizProj = [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 0, 0], [0, 0, 0, 1]];
  for (i = 0; i < obj.pontos.length; i++) {
    // console.log(multiMatriz(obj.pontos[i]), matrizProj);
    projecaoPontos.push(multiPontoMatriz(obj.pontos[i], matrizProj));
  }
  return projecaoPontos;
}

function projCavaleira(obj) {
  projecaoPontos = [[]];
  let i;
  let matrizProj = [[1, 0, 0, 0], [0, 1, 0, 0], [Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0, 0], [0, 0, 0, 1]];
  for (i = 0; i < obj.pontos.length; i++) {
    projecaoPontos.push(multiPontoMatriz(obj.pontos[i], matrizProj));
  }
  return projecaoPontos;
}

function projCabinet(obj) {
  projecaoPontos = [[]];
  let i;
  let matrizProj = [[1, 0, 0, 0], [0, 1, 0, 0], [0.4477 / 2, 0.8941 / 2, 0, 0], [0, 0, 0, 1]];
  for (i = 0; i < obj.pontos.length; i++) {
    projecaoPontos.push(multiPontoMatriz(obj.pontos[i], matrizProj));
  }
  return projecaoPontos;
}

function multiPontoMatriz(ponto, matriz2) {
  let result = [[]];
  aux = 0;
  for (j = 0; j < matriz2[0].length; j++) {
    result[0][j] = 0;
    for (k = 0; k < matriz2.length; k++) {
      result[0][j] += ponto[k] * matriz2[k][j];
    }
  }
  return result;
}

function translacao(dx, dy, dz) {
  let novoObj = [[]];
  let matrizTransf = [[1, 0, 0, dx], [0, 1, 0, dy], [0, 0, 1, dz], [0, 0, 0, 1]];
  for (let i = 0; i < obj.pontos; i++) {
    novoObj[i] = multiPontoMatriz(obj.pontos[i], matrizTransf);
  }
  return novoObj;
}

function rotacaoX(rad) {
  let novoObj = [[]];
  let matrizTransf = [[1, 0, 0, 0], [0, Math.cos(rad), -Math.sin(rad), 0], [0, Math.sin(rad), Math.cos(rad), 0], [0, 0, 0, 1]];
  for (let i = 0; i < obj.pontos; i++) {
    novoObj[i] = multiPontoMatriz(obj.pontos[i], matrizTransf);
  }
  return novoObj;
}

function rotacaoY(rad) {
  let novoObj = [[]];
  let matrizTransf = [[Math.cos(rad), 0, Math.sin(rad), 0], [0, 1, 0, 0], [-Math.sin(rad), 0, Math.cos(rad), 0], [0, 0, 0, 1]];
  for (let i = 0; i < obj.pontos; i++) {
    novoObj[i] = multiPontoMatriz(obj.pontos[i], matrizTransf);
  }
  return novoObj;
}

function rotacaoZ(rad) {
  let novoObj = [[]];
  let matrizTransf = [[Math.cos(rad), -Math.sin(rad), 0, 0], [Math.sin(rad), Math.cos(rad), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (let i = 0; i < obj.pontos; i++) {
    novoObj[i] = multiPontoMatriz(obj.pontos[i], matrizTransf);
  }
  return novoObj;
}

function escala(dx, dy, dz) {
  let novoObj = [[]];
  let matrizTransf = [[dx, 0, 0, 0], [0, dy, 0, 0], [0, 0, dz, 0]];
  for (let i = 0; i < obj.pontos; i++) {
    novoObj[i] = multiPontoMatriz(obj.pontos[i], matrizTransf);
  }
  return novoObj;
}

function bresenhamLinha(inicio, fim) {
  var dx = Math.abs(fim.x - inicio.x);
  var dy = Math.abs(fim.y - inicio.y);
  var m = (fim.y - inicio.y) / (fim.x - inicio.x);

  var atual = { x: 0, y: 0 };

  if (dx > dy) { // reta mais horizontal
    atual.x = inicio.x;
    if (inicio.x <= fim.x) { // esquerda para direita
      while (atual.x <= fim.x) {
        atual.y = parseInt((m * (atual.x - inicio.x)) + inicio.y);
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.x++;
      }
    }
    else { // direita para esquerda
      while (atual.x > fim.x) {
        atual.y = parseInt((m * (atual.x - inicio.x)) + inicio.y);
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.x--;
      }
    }
  }

  else { // reta mais vertical
    atual.y = inicio.y;
    if (inicio.y <= fim.y) { // cima para baixo
      while (atual.y <= fim.y) {
        atual.x = ((atual.y - inicio.y) / m) + inicio.x;
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y++;
      }
    }
    else {
      while (atual.y > fim.y) { // baixo para cima
        atual.x = ((atual.y - inicio.y) / m) + inicio.x;
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y--;
      }
    }
  }
}
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