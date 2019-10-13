var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var inicio = { x: 0, y: 0 };
var fim = { x: 0, y: 0 };
var mouse = { x: 0, y: 0 };

function main() {
  // const reta = document.getElementById('reta');
  // const circulo = document.getElementById('circulo');
  // if (reta.getAttribute('checked') === 'checked') {
  $('#reta').click(function () {

    canvas.addEventListener('mousemove', function (e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    }, false);

    ctx.lineWidth = 1;

    canvas.addEventListener('mousedown', function (e) {
      inicio.x = mouse.x;
      inicio.y = mouse.y;
    }, false);

    canvas.removeEventListener('mouseup', circuloMouseUp, false);
    canvas.addEventListener('mouseup', retaMouseUp, false);
  });
  // if (circulo.getAttribute('checked') === 'checked') {
  $('#circulo').click(function () {

    canvas.addEventListener('mousemove', function (e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    }, false);

    ctx.lineWidth = 1;

    canvas.addEventListener('mousedown', function (e) {
      inicio.x = mouse.x;
      inicio.y = mouse.y;
    }, false);

    canvas.removeEventListener('mouseup', retaMouseUp, false);
    canvas.addEventListener('mouseup', circuloMouseUp, false);
  });
}

function bresenhamLinha(inicio, fim) {
  // console.log(inicio, fim);
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

function bresenhamCirculo(inicio, fim) {
  let raio = Math.sqrt(Math.pow(fim.x - inicio.x, 2) + Math.pow(fim.y - inicio.y, 2));
  let i = 0, inc;
  if (raio >= 1)
    inc = 1 / raio;
  else
    inc = 1;
  for (i; i < 360; i = i + inc) {
    ctx.fillStyle = 'black';
    ctx.fillRect(Math.round(raio * Math.cos(i)) + inicio.x, Math.round(raio * Math.sin(i)) + inicio.y, 1, 1);
  }
}

function circuloMouseUp(e) {
  fim.x = mouse.x;
  fim.y = mouse.y;

  bresenhamCirculo(inicio, fim);
}

function retaMouseUp(e) {
  fim.x = mouse.x;
  fim.y = mouse.y;

  bresenhamLinha(inicio, fim);
}