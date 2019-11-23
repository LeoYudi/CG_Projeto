var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
var botao = document.getElementById('botao');
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var poligono = {
  vertices: [],
  lados: []
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
  botao.addEventListener('click', () => {
    if (poligono.vertices.length > 2) {
      ctx.fillStyle = 'red';
      for (let i = 1; i < poligono.vertices.length; i++)
        poligono.lados.push(bresenhamLinha(poligono.vertices[i - 1], poligono.vertices[i]));
      poligono.lados.push(bresenhamLinha(poligono.vertices[0], poligono.vertices[poligono.vertices.length - 1]));
      canvas.removeEventListener('click', pegarVertices, false);
    }
  }, false);
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
        pontos.push(atual);
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.x++;
      }
    }
    else { // direita para esquerda
      while (atual.x > fim.x) {
        atual.y = parseInt((m * (atual.x - inicio.x)) + inicio.y);
        pontos.push(atual);
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
        pontos.push(atual);
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y++;
      }
    }
    else {
      while (atual.y > fim.y) { // baixo para cima
        atual.x = ((atual.y - inicio.y) / m) + inicio.x;
        pontos.push(atual);
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y--;
      }
    }
  }
  return pontos;
}