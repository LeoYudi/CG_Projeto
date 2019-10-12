var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

let mouse = inicio = fim = { x: 0, y: 0 };

function main() {
  canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  }, false);

  ctx.lineWidth = 1;
  ctx.lineJoin = 'round';
  ctx.lineCap = 'round';

  canvas.addEventListener('mousedown', function (e) {
    inicio.x = e.pageX - this.offsetLeft;
    inicio.y = e.pageY - this.offsetTop;
    inicio.x = mouse.x;
    inicio.y = mouse.y;
    ctx.beginPath();
    ctx.moveTo(inicio.x, inicio.y);
  }, false);

  canvas.addEventListener('mouseup', function (e) {
    fim.x = mouse.x;
    fim.y = mouse.y;
    bresenhamLinha(inicio, fim);
  }, false);
}

function bresenhamLinha(ponto1, ponto2) {
  var dx = ponto2.x - ponto1.x;
  var dy = ponto2.y - ponto1.y;
  var inclinacao = 0;

  if (dx < 0) // caso ponto final < ponto inicial
  {
    var aux = ponto1;
    ponto1 = ponto2;
    ponto2 = aux;
  }
  if (dy < 0)
    inclinacao = -1;
  else
    inclinacao = 1;

  var d;
  var atual = ponto1;

  ctx.lineTo(atual.x, atual.y);

  if (dx >= inclinacao * dy) {    // m<=1
    if (dy < 0) { // caso y2<y1
      d = 2 * dy + dx;
      while (atual.x < ponto2.x) {
        if (d < 0) { // escolhido é o I
          d += 2 * (dy + dx);
          atual.x++;
          atual.y--;
        }
        else { // escolhido é o S
          d += 2 * dy;
          atual.x++; // varia apenas no eixo x
        }
        ctx.lineTo(atual.x, atual.y);
      }
    }
    else { // caso y1<y2
      d = 2 * dy - dx;
      while (atual.x < ponto2.x) {
        if (d < 0) { // escolhido é o I
          d += 2 * dy;
          atual.x++; // varia apenas no eixo x
        }
        else { // escolhido é o S
          d += 2 * (dy - dx);
          atual.x++;
          atual.y++;
        }
        ctx.lineTo(atual.x, atual.y);
      }
    }
  }
  else { // |m|>1
    if (dy < 0) { // caso y2<y1
      d = dy + 2 * dx;
      while (atual.y > ponto2.y) {
        if (d < 0) {
          d += 2 * dx;
          atual.y--; // varia apenas no eixo y
        }
        else {
          d += 2 * (dy + dx);
          atual.x++;
          atual.y--;
        }
        ctx.lineTo(atual.x, atual.y);
      }
    }
    else { // caso y1<y2
      d = dy - 2 * dx;
      while (atual.y < ponto2.y) {
        if (d < 0) {
          d += 2 * (dy - dx);
          atual.x++;
          atual.y++;
        }
        else {
          d += -2 * dx;
          atual.y++; // varia apenas no eixo y
        }
        ctx.lineTo(atual.x, atual.y);
      }
    }
  }
  ctx.lineTo(atual.x, atual.y);
  ctx.stroke();
}

function circulo() {
  canvas.addEventListener('mousemove', function (e) {
    mouse.x = e.pageX - this.offsetLeft;
    mouse.y = e.pageY - this.offsetTop;
  }, false);
  canvas.addEventListener('mousedown', function (e) {
    inicio.x = e.pageX - this.offsetLeft;
    inicio.y = e.pageY - this.offsetTop;
  });
  canvas.addEventListener('mouseup', function (e) {
    fim.x = e.pageX - this.offsetLeft;
    fim.y = e.pageY - this.offsetTop;
    let raio = Math.sqrt(fim.x - inicio.x) + Math.sqrt(fim.y - inicio.y);
    let i = 0, inc;
    if (raio >= 1)
      inc = 1 / raio;
    else
      inc = 1;
    for (i; i < 360; i = i + inc) {
      ctx.fillStyle = 'black';
      ctx.fillRect(Math.round(raio * Math.cos(i)) + inicio.x, Math.round(raio * Math.sin(i)) + inicio.y, 1, 1);
    }
  });
}