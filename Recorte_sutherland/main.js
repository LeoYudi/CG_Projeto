var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var mouse = { x: 0, y: 0 };
var inicio = { x: 0, y: 0 };
var fim = { x: 0, y: 0 };
var clique = 0;
var lim1 = { x: 0, y: 0 };
var lim2 = { x: 0, y: 0 };
var lim3 = { x: 0, y: 0 };
var lim4 = { x: 0, y: 0 };
var xmin, xmax, ymin, ymax;

function main() {
    canvas.addEventListener('mousemove', function (e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    }, false);

    ctx.lineWidth = 1;
}

function bresenhamLinha(inicio, fim){
  console.log(inicio, fim);
  var dx = Math.abs(fim.x - inicio.x);
  var dy = Math.abs(fim.y - inicio.y);
  var m = (fim.y - inicio.y) / (fim.x - inicio.x);

  var atual = { x: 0, y: 0 };
  
  if (dx > dy) { // reta mais horizontal
    atual.x = inicio.x;
    if (inicio.x <= fim.x) { // esquerda para direita
      while(atual.x <= fim.x){
        atual.y = parseInt((m*(atual.x - inicio.x)) + inicio.y);
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.x++;
      }
    }
    else { // direita para esquerda
      while (atual.x > fim.x) { 
        atual.y = parseInt((m*(atual.x - inicio.x)) + inicio.y);
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.x--;
      }
    }
  }

  else { // reta mais vertical
    atual.y = inicio.y;
    if (inicio.y <= fim.y){ // cima para baixo
      while(atual.y <= fim.y){
        atual.x = ((atual.y - inicio.y)/m) + inicio.x;
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y++;
      }
    }
    else {
      while(atual.y > fim.y){ // baixo para cima
        atual.x = ((atual.y - inicio.y)/m) + inicio.x;
        ctx.fillRect(atual.x, atual.y, 1, 1);
        atual.y--;
      }
    }
  }
}






function janelaRecorte(){
  canvas.addEventListener('click', function limites() {
    if (clique==0) {
      lim1.x = mouse.x;
      lim1.y = mouse.y;
      clique++;
    }
    else {
      clique = 0;
      lim2.x = mouse.x;
      lim2.y = mouse.y;
      lim3.x = lim1.x; 
      lim3.y = lim2.y;
      lim4.x = lim2.x;
      lim4.y = lim1.y;
      // limites da janela
      if(lim1.x >= lim2.x) { xmax = lim1.x; xmin = lim2.x; }
      else { xmax = lim2.x; xmin = lim1.x; }
      if(lim1.y >= lim2.y) { ymax = lim1.y; ymin = lim2.y; }
      else { ymax = lim2.y; ymin = lim1.y; }
      // desenhando a janela        
      bresenhamLinha(lim1, lim3);
      bresenhamLinha(lim3, lim2);
      bresenhamLinha(lim2, lim4);
      bresenhamLinha(lim4, lim1);
      canvas.removeEventListener('click', limites, false);
      // lendo as extremidades dos segmentos e desenhando-os
      canvas.addEventListener('click', function ini () {
        inicio.x = mouse.x;
        inicio.y = mouse.y;
        canvas.removeEventListener('click', ini, false);
        canvas.addEventListener('click', function final () {
          fim.x = mouse.x;
          fim.y = mouse.y;
          janelaLinha();
          canvas.removeEventListener('click', final, false);
          canvas.addEventListener('click', ini, false);
        }, false);
      }, false);
    }
  }, false);
}

function intercepta(ponto){
  if(ponto.x >= xmin && ponto.x < xmax)
    if(ponto.y >= ymin && ponto.y < ymax)
      return true;
  return false;
}


function criarCodigo(ponto) {
  var cod = ['0', '0', '0', '0'];
  if (ponto.x < xmin)
    cod[3] = '1';
  else if (ponto.x > xmax)
    cod[2] = '1';

  if (ponto.y < ymin)
    cod[1] = '1';
  else if(ponto.y > ymax)
    cod[0] = '1';

  return cod;
}

function and(cod1, cod2){
  var cod = ['0', '0', '0', '0'];
  for(var i=0; i<4; i++)
    if((cod1[i] == '1') && (cod2[i] == '1'))
     cod[i] = '1';
  return cod;
}


function janelaLinha() {
  var cod1 = criarCodigo(inicio);
  var cod2 = criarCodigo(fim);
  // linha completamente visivel
  if ((cod1.join('') == '0000') && (cod2.join('') == '0000')) { 
    bresenhamLinha(inicio, fim);
    return;
  }
  var cod = and(cod1, cod2);
  // linha parcialmente visivel
  if(cod.join('') == '0000') { 
    var baixo = { x: 0, y: ymin }; // eixo y invertido
    var cima = { x: 0, y: ymax };
    var esq = { x: xmin, y: 0 };
    var dir = { x: xmax, y: 0 };
    var m = (fim.y - inicio.y) / (fim.x - inicio.x);
    
    var p1 = undefined; 
    var p2 = undefined;
    
    var i;
    if (cod1.join('') == '0000') { 
      i = cod2.indexOf('1');
      p1 = inicio;
    } else if (cod2.join('') == '0000') {
      i = cod1.indexOf('1');
      p1 = fim;
    }
    // linha com um ponto dentro da janela
    if(p1) {
      switch(i) {
        case 0: 
          cima.x = (1/m)*(ymax-inicio.y) + inicio.x;
          bresenhamLinha(p1, cima);
          break;
        case 1: 
          baixo.x = (1/m)*(ymin-inicio.y) + inicio.x;
          bresenhamLinha(p1, baixo);
          break;
        case 2: 
          dir.y = m*(xmax-inicio.x) + inicio.y;
          bresenhamLinha(p1, dir);
          break;
        case 3: 
          esq.y = m*(xmin-inicio.x) + inicio.y;
          bresenhamLinha(p1, esq);
          break;
      }
      return;
    }
    // linha cortando completamente a janela
    else {
      cima.x = (1/m)*(ymax-inicio.y) + inicio.x;
      baixo.x = (1/m)*(ymin-inicio.y) + inicio.x;
      esq.y = m*(xmin-inicio.x) + inicio.y;
      dir.y = m*(xmax-inicio.x) + inicio.y;
      
      if(intercepta(cima)){
        console.log(xmin, xmax);
        console.log('cima', cima);
        p1 = cima;
      }

      if(intercepta(baixo)){
        console.log(xmin, xmax);
        console.log('baixo', baixo);
        if(p1) p2 = baixo;
        else p1 = baixo;
      }
      
      if(intercepta(esq)){
        console.log(ymin, ymax);
        console.log('esq', esq);
        if(p1) p2 = esq;
        else p1 = esq;
      }
      
      if(intercepta(dir)){
        console.log(ymin, ymax);
        console.log('dir', dir);
        if(p1) p2 = dir;
        else p1 = dir;
      }
      
      bresenhamLinha(p1, p2);
    }
  }
}