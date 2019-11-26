var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
var ligar = document.getElementById('ligar');
var colorir = document.getElementById('colorir');
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var poligono = {
  vertices: [],
  lados: []
}

var bounding_box = {
  vertices: [],
  pontos: [],
  menor: { x: 0, y: 0 },
  maior: { x: 0, y: 0 },
}

var pegarVertices;

function main() {
  canvas.addEventListener('click', pegarVertices = function (e) {
    let ponto = {
      x: e.pageX - this.offsetLeft,
      y: e.pageY - this.offsetTop,
    }
    ctx.fillStyle = 'cyan';
    ctx.fillRect(ponto.x, ponto.y, 3, 3);
    poligono.vertices.push(ponto);
  }, false);
  ligar.addEventListener('click', () => {
    if (poligono.vertices.length > 2) {
      ctx.fillStyle = 'black';
      for (let i = 1; i < poligono.vertices.length; i++)
        poligono.lados.push(bresenhamLinha(poligono.vertices[i - 1], poligono.vertices[i]));
      poligono.lados.push(bresenhamLinha(poligono.vertices[0], poligono.vertices[poligono.vertices.length - 1]));
      initVerticesBoundingBox();
      initPontosBoundingBox();
      ctx.fillStyle = 'red';
      for (let i = 1; i < bounding_box.vertices.length; i++)
        bresenhamLinha(bounding_box.vertices[i - 1], bounding_box.vertices[i]);
      bresenhamLinha(bounding_box.vertices[0], bounding_box.vertices[bounding_box.vertices.length - 1]);
      canvas.removeEventListener('click', pegarVertices, false);
    }
  }, false);
  colorir.addEventListener('click', colorir = () => {
    let anterior = 0;
    for (let i = 0; i < poligono.lados.length; i++) {
      for (let j = 0; j < poligono.lados[i].length; j++) {
        if (anterior != poligono.lados[i][j].y) {
          inverterCor(poligono.lados[i][j]);
        }
        anterior = poligono.lados[i][j].y;
      }
    }
    printaBoundingBox();
  }, false);
}

function initVerticesBoundingBox() {
  let maior = {
    x: -Infinity,
    y: -Infinity
  };
  let menor = {
    x: Infinity,
    y: Infinity
  }
  for (let i = 0; i < poligono.vertices.length; i++) {
    if (maior.x < poligono.vertices[i].x)
      maior.x = poligono.vertices[i].x;
    if (menor.x > poligono.vertices[i].x)
      menor.x = poligono.vertices[i].x;
    if (maior.y < poligono.vertices[i].y)
      maior.y = poligono.vertices[i].y;
    if (menor.y > poligono.vertices[i].y)
      menor.y = poligono.vertices[i].y;
  }
  bounding_box.vertices.push(menor);
  bounding_box.vertices.push({ x: menor.x, y: maior.y });
  bounding_box.vertices.push(maior);
  bounding_box.vertices.push({ x: maior.x, y: menor.y });
  bounding_box.maior = maior;
  bounding_box.menor = menor;
}

function initPontosBoundingBox() {
  for (let i = 0; i < bounding_box.maior.x - bounding_box.menor.x; i++) {
    bounding_box.pontos[i] = [];
    for (let j = 0; j < bounding_box.maior.y - bounding_box.menor.y; j++) {
      bounding_box.pontos[i].push('white');
    }
  }
}

function printaBoundingBox() {
  for (let i = 0; i < bounding_box.maior.x - bounding_box.menor.x; i++) {
    for (let j = 0; j < bounding_box.maior.y - bounding_box.menor.y; j++) {
      ctx.fillStyle = bounding_box.pontos[i][j];
      ctx.fillRect(i + bounding_box.menor.x, j + bounding_box.menor.y, 1, 1);
    }
  }
}

// function insertPontos(pontos) {
//   for (let i = 0; i < pontos.length; i++) {
//     bounding_box.pontos[pontos[i].x][pontos[i].y].cor = 'black';
//   }
// }

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

function inverterCor(ponto) {
  let aux = {
    x: parseInt(ponto.x),
    y: parseInt(ponto.y)
  }
  for (let i = aux.x - bounding_box.menor.x; i < bounding_box.maior.x - bounding_box.menor.x; i++) {
    if (bounding_box.pontos[i][aux.y - bounding_box.menor.y] == 'black') {
      bounding_box.pontos[i][aux.y - bounding_box.menor.y] = 'white';
    }
    else {
      bounding_box.pontos[i][aux.y - bounding_box.menor.y] = 'black';
    }
  }
}

// function éVertice(ponto) {
//   for (let i = 0; i < poligono.vertices.length; i++) {
//     if (ponto.x == poligono.vertices[i].x && ponto.y == poligono.vertices[i].y)
//       return true;
//   }
//   return false;
// }