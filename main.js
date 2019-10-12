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
    canvas.addEventListener('mousemove', function (e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    }, false);

    ctx.lineWidth = 1;

    canvas.addEventListener('mousedown', function (e) {
      inicio.x = mouse.x;
      inicio.y = mouse.y;
    }, false);

    canvas.addEventListener('mouseup', function (e) {
      fim.x = mouse.x;
      fim.y = mouse.y;

      bresenhamLinha(inicio, fim);
    }, false);
}

function bresenhamLinha(ponto1, ponto2){
  console.log(ponto1, ponto2);
  var dx = Math.abs(ponto2.x - ponto1.x);
  var dy = Math.abs(ponto2.y - ponto1.y);
  var m = ponto2.x - ponto1.x / ponto2.y - ponto1.y;

  var atual = ponto1;
  
  if (dx > dy) { // reta mais horizontal
    if (ponto1.x <= ponto2.x) { // esquerda para direita
      while(atual.x <= ponto2.x){
        atual.y = m*(atual.x - ponto1.x) + ponto1.y;
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.x++;
      }
    }
    else { // direita para esquerda
      while (atual.x >= ponto2.x) { 
        atual.y = m * (atual.x - ponto1.x) + ponto1.y;
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.x++;
      }
    }
  }
  else { // reta mais vertical
    if (ponto1.y <= ponto2.y){ // cima para baixo
      while(atual.y <= ponto2.y){
        atual.x = ((atual.y - ponto2.y)/m) + ponto1.x;
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y++;
      }
    }
    else {
      while(atual.y >= ponto2.y){ // baixo para cima
        atual.x = ((atual.y - ponto2.y)/m) + ponto1.x;
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y--;
      }
    }
  }


  // var inclinacao = 0;

  // if (dx < 0) // caso ponto final < ponto inicial
  // {
  //   var aux = ponto1;
  //   ponto1 = ponto2;
  //   ponto2 = aux;
  // }
  // if (dy < 0)
  //   inclinacao = -1;
  // else
  //   inclinacao = 1;
  
  // var d;
  // var atual = ponto1;
  
  // ctx.fillRect(atual.x, atual.y, 1, 1);
  // if (dx >= inclinacao * dy) {    // m<=1
  //   if (dy < 0) { // caso y2<y1
  //     d = 2 * dy + dx;
  //     while (atual.x < ponto2.x) {
  //       if (d < 0) { // escolhido é o I
  //         d += 2 * (dy + dx);
  //         atual.x++;
  //         atual.y--;
  //       }
  //       else { // escolhido é o S
  //         d += 2 * dy;
  //         atual.x++; // varia apenas no eixo x
  //       }
  //       ctx.fillRect(atual.x, atual.y, 1, 1);
  //     }
  //   }
  //   else { // caso y1<y2
  //     d = 2 * dy - dx;
  //     while (atual.x < ponto2.x) {
  //       if (d < 0) { // escolhido é o I
  //         d += 2 * dy;
  //         atual.x++; // varia apenas no eixo x
  //       }
  //       else { // escolhido é o S
  //         d += 2 * (dy - dx);
  //         atual.x++;
  //         atual.y++;
  //       }
  //       ctx.fillRect(atual.x, atual.y, 1, 1);
  //     }
  //   }
  // }
  // else { // |m|>1
  //   if (dy < 0) { // caso y2<y1
  //     d = dy + 2 * dx;
  //     while (atual.y > ponto2.y) {
  //       if (d < 0) {
  //         d += 2 * dx;
  //         atual.y--; // varia apenas no eixo y
  //       }
  //       else {
  //         d += 2 * (dy + dx);
  //         atual.x++;
  //         atual.y--;
  //       }
  //       ctx.fillRect(atual.x, atual.y, 1, 1);
  //     }
  //   }
  //   else { // caso y1<y2
  //     d = dy - 2 * dx;
  //     while (atual.y < ponto2.y) {
  //       if (d < 0) {
  //         d += 2 * (dy - dx);
  //         atual.x++;
  //         atual.y++;
  //       }
  //       else {
  //         d += -2 * dx;
  //         atual.y++; // varia apenas no eixo y
  //       }
  //       ctx.fillRect(atual.x, atual.y, 1, 1);
  //     }
  //   }
  // }
  // ctx.fillRect(atual.x, atual.y, 1, 1);
}