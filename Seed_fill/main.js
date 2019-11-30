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
  criarPixels();
}

function criarPixels() {
  let vet = [];
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 0 }, { x: centro.x + 130, y: centro.y - 0 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 10 }, { x: centro.x + 130, y: centro.y - 10 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 70 }, { x: centro.x + 130, y: centro.y - 70 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 70, y: centro.y - 80 }, { x: centro.x + 130, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 130, y: centro.y - 0 }, { x: centro.x + 130, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 120, y: centro.y - 20 }, { x: centro.x + 130, y: centro.y - 20 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 120, y: centro.y - 30 }, { x: centro.x + 130, y: centro.y - 30 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 120, y: centro.y - 40 }, { x: centro.x + 130, y: centro.y - 40 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 120, y: centro.y - 50 }, { x: centro.x + 130, y: centro.y - 50 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 120, y: centro.y - 60 }, { x: centro.x + 130, y: centro.y - 60 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 70, y: centro.y - 0 }, { x: centro.x + 70, y: centro.y - 10 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 80, y: centro.y - 0 }, { x: centro.x + 80, y: centro.y - 10 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 90, y: centro.y - 0 }, { x: centro.x + 90, y: centro.y - 10 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 100, y: centro.y - 0 }, { x: centro.x + 100, y: centro.y - 10 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 110, y: centro.y - 0 }, { x: centro.x + 110, y: centro.y - 10 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 120, y: centro.y - 0 }, { x: centro.x + 120, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 80, y: centro.y - 70 }, { x: centro.x + 80, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 90, y: centro.y - 70 }, { x: centro.x + 90, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 100, y: centro.y - 70 }, { x: centro.x + 100, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 110, y: centro.y - 70 }, { x: centro.x + 110, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 70, y: centro.y - 70 }, { x: centro.x + 70, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 60 }, { x: centro.x + 0, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 60 }, { x: centro.x + 60, y: centro.y - 60 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 10, y: centro.y - 60 }, { x: centro.x + 10, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 20, y: centro.y - 60 }, { x: centro.x + 20, y: centro.y - 70 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 30, y: centro.y - 60 }, { x: centro.x + 30, y: centro.y - 70 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 40, y: centro.y - 60 }, { x: centro.x + 40, y: centro.y - 70 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 50, y: centro.y - 60 }, { x: centro.x + 50, y: centro.y - 70 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 0 }, { x: centro.x + 60, y: centro.y - 70 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 130 }, { x: centro.x + 70, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 120 }, { x: centro.x + 70, y: centro.y - 120 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 20, y: centro.y - 120 }, { x: centro.x + 20, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 30, y: centro.y - 120 }, { x: centro.x + 30, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 40, y: centro.y - 120 }, { x: centro.x + 40, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 50, y: centro.y - 120 }, { x: centro.x + 50, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 120 }, { x: centro.x + 60, y: centro.y - 130 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 80 }, { x: centro.x + 10, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 90 }, { x: centro.x + 10, y: centro.y - 90 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 100 }, { x: centro.x + 10, y: centro.y - 100 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 110 }, { x: centro.x + 10, y: centro.y - 110 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 0, y: centro.y - 120 }, { x: centro.x + 10, y: centro.y - 120 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 70 }, { x: centro.x + 60, y: centro.y - 120 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 80 }, { x: centro.x + 70, y: centro.y - 80 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 90 }, { x: centro.x + 70, y: centro.y - 90 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 100 }, { x: centro.x + 70, y: centro.y - 100 }));
  vet = vet.concat(bresenhamLinha({ x: centro.x + 60, y: centro.y - 110 }, { x: centro.x + 70, y: centro.y - 110 }));
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