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

var botao = document.getElementById('botao');

var centro = {
  x: parseInt(canvas.width / 2),
  y: parseInt(canvas.height / 2)
};

var mouseAnterior = { x: 0, y: 0 };
var mouse = { x: 0, y: 0 };

var risco = [];

var obj = [];

function main() {
  bresenhamLinha({ x: centro.x, y: 0 }, { x: centro.x, y: canvas.height });
  canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  }, false);

  ctx.lineWidth = 3;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  canvas.addEventListener('mousedown', aux = function (e) {
    ctx.beginPath();
    ctx.moveTo(mouse.x, mouse.y);
    mouseAnterior = { x: mouse.x, y: mouse.y }

    canvas.addEventListener('mousemove', onPaint, false);
  }, false);

  canvas.addEventListener('mouseup', function () {
    canvas.removeEventListener('mousemove', onPaint, false);
    canvas.removeEventListener('mousedown', aux, false);
  }, false);

  var onPaint = function () {
    risco = risco.concat(bresenhamLinha(mouseAnterior, mouse));
    mouseAnterior = { x: mouse.x, y: mouse.y };
  };

  botao.addEventListener('click', () => {
    for (let i in risco)
      bresenhamCirculo({ x: 0, y: risco[i].y - centro.y }, { x: risco[i].x - centro.x, y: risco[i].y - centro.y });
    let pontosProj = projCavaleira(obj);
    console.log(risco);
    pontosProj.map((ponto) => {
      ponto.x += centro.x;
      ponto.y += centro.y;
      return ponto;
    })
    printaProj(pontosProj);
  }, false);
}

function bresenhamCirculo(inicio, fim) {
  let raio = Math.sqrt(Math.pow(fim.x - inicio.x, 2) + Math.pow(fim.y - inicio.y, 2));
  let i = 0, inc;
  if (raio >= 1)
    inc = 1 / raio;
  else
    inc = 1;
  for (i; i < 360; i = i + inc)
    obj.push({ x: raio * Math.cos(i) + inicio.x, y: inicio.y, z: raio * Math.sin(i) + inicio.y });
}

function projCavaleira(pontos) {
  let projecaoPontos = [];
  let matrizProj = [[1, 0, 0, 0], [0, 1, 0, 0], [Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0, 0], [0, 0, 0, 1]];
  for (let i = 0; i < pontos.length; i++) {
    let vet = [];
    vet = multiPontoMatriz([pontos[i].x, pontos[i].y, pontos[i].z, 1], matrizProj);
    projecaoPontos.push({ x: parseInt(vet[0]), y: parseInt(vet[1]) })
  }
  return projecaoPontos;
}

function multiPontoMatriz(ponto, matriz) {
  let result = [];
  aux = 0;
  for (j = 0; j < matriz[0].length; j++) {
    result[j] = 0;
    for (k = 0; k < matriz.length; k++) {
      result[j] += ponto[k] * matriz[k][j];
    }
  }
  return result;
}

function printaProj(pontos) {
  for (let i in pontos)
    ctx2.fillRect(pontos[i].x, pontos[i].y, 1, 1);

}

function bresenhamLinha(inicio, fim) {
  // console.log(inicio, fim);
  let dx = Math.abs(fim.x - inicio.x);
  let dy = Math.abs(fim.y - inicio.y);
  let m = (fim.y - inicio.y) / (fim.x - inicio.x);
  let pontos = [];
  let atual = { x: 0, y: 0 };

  if (dx > dy) { // reta mais horizontal
    atual.x = inicio.x;
    if (inicio.x <= fim.x) { // esquerda para direita
      while (atual.x <= fim.x) {
        atual.y = parseInt((m * (atual.x - inicio.x)) + inicio.y);
        if (!(atual.x == fim.x && atual.y == fim.y))
          pontos.push({ x: atual.x, y: atual.y });
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.x++;
      }
    }
    else { // direita para esquerda
      while (atual.x > fim.x) {
        atual.y = parseInt((m * (atual.x - inicio.x)) + inicio.y);
        if (!(atual.x == fim.x && atual.y == fim.y))
          pontos.push({ x: atual.x, y: atual.y });
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
        if (!(atual.x == fim.x && atual.y == fim.y))
          pontos.push({ x: atual.x, y: atual.y });
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y++;
      }
    }
    else {
      while (atual.y > fim.y) { // baixo para cima
        atual.x = ((atual.y - inicio.y) / m) + inicio.x;
        if (!(atual.x == fim.x && atual.y == fim.y))
          pontos.push({ x: atual.x, y: atual.y });
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y--;
      }
    }
  }
  return pontos;
}