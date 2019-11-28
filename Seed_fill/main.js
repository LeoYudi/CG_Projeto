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

}

function criarPixels() {
  bresenham(centroCanvas.x + 60, centroCanvas.y - 0, centroCanvas.x + 130, centroCanvas.y - 0, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 60, centroCanvas.y - 10, centroCanvas.x + 130, centroCanvas.y - 10, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 70, centroCanvas.x + 130, centroCanvas.y - 70, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 70, centroCanvas.y - 80, centroCanvas.x + 130, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 130, centroCanvas.y - 0, centroCanvas.x + 130, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 120, centroCanvas.y - 20, centroCanvas.x + 130, centroCanvas.y - 20, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 120, centroCanvas.y - 30, centroCanvas.x + 130, centroCanvas.y - 30, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 120, centroCanvas.y - 40, centroCanvas.x + 130, centroCanvas.y - 40, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 120, centroCanvas.y - 50, centroCanvas.x + 130, centroCanvas.y - 50, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 120, centroCanvas.y - 60, centroCanvas.x + 130, centroCanvas.y - 60, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 70, centroCanvas.y - 0, centroCanvas.x + 70, centroCanvas.y - 10, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 80, centroCanvas.y - 0, centroCanvas.x + 80, centroCanvas.y - 10, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 90, centroCanvas.y - 0, centroCanvas.x + 90, centroCanvas.y - 10, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 100, centroCanvas.y - 0, centroCanvas.x + 100, centroCanvas.y - 10, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 110, centroCanvas.y - 0, centroCanvas.x + 110, centroCanvas.y - 10, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 120, centroCanvas.y - 0, centroCanvas.x + 120, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 80, centroCanvas.y - 70, centroCanvas.x + 80, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 90, centroCanvas.y - 70, centroCanvas.x + 90, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 100, centroCanvas.y - 70, centroCanvas.x + 100, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 110, centroCanvas.y - 70, centroCanvas.x + 110, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 70, centroCanvas.y - 70, centroCanvas.x + 70, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 60, centroCanvas.x + 0, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 60, centroCanvas.x + 60, centroCanvas.y - 60, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 10, centroCanvas.y - 60, centroCanvas.x + 10, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 20, centroCanvas.y - 60, centroCanvas.x + 20, centroCanvas.y - 70, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 30, centroCanvas.y - 60, centroCanvas.x + 30, centroCanvas.y - 70, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 40, centroCanvas.y - 60, centroCanvas.x + 40, centroCanvas.y - 70, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 50, centroCanvas.y - 60, centroCanvas.x + 50, centroCanvas.y - 70, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 60, centroCanvas.y - 0, centroCanvas.x + 60, centroCanvas.y - 70, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 130, centroCanvas.x + 70, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 120, centroCanvas.x + 70, centroCanvas.y - 120, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 20, centroCanvas.y - 120, centroCanvas.x + 20, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 30, centroCanvas.y - 120, centroCanvas.x + 30, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 40, centroCanvas.y - 120, centroCanvas.x + 40, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 50, centroCanvas.y - 120, centroCanvas.x + 50, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 60, centroCanvas.y - 120, centroCanvas.x + 60, centroCanvas.y - 130, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 80, centroCanvas.x + 10, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 90, centroCanvas.x + 10, centroCanvas.y - 90, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 100, centroCanvas.x + 10, centroCanvas.y - 100, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 110, centroCanvas.x + 10, centroCanvas.y - 110, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 0, centroCanvas.y - 120, centroCanvas.x + 10, centroCanvas.y - 120, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 60, centroCanvas.y - 70, centroCanvas.x + 60, centroCanvas.y - 120, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 60, centroCanvas.y - 80, centroCanvas.x + 70, centroCanvas.y - 80, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 60, centroCanvas.y - 90, centroCanvas.x + 70, centroCanvas.y - 90, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 60, centroCanvas.y - 100, centroCanvas.x + 70, centroCanvas.y - 100, ctx, color = "#FF0000");
  bresenham(centroCanvas.x + 60, centroCanvas.y - 110, centroCanvas.x + 70, centroCanvas.y - 110, ctx, color = "#FF0000");
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