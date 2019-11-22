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

var planos = [];
var zbuffer = [];

function rotacionar(event) {
  var key = event.keyCode;
  switch (key) {
    case 16:  //shift eixo z
      limpa();
      inicializaZbuffer();
      for (let i = 0; i < planos.length; i++) {
        rotacaoZ(Math.PI / 18, planos[i].pontos);
        comparaZbuffer(planos[i]);
      }
      printaZbuffer(zbuffer);
      break;
    case 17:  //ctrl eixo z
      limpa();
      inicializaZbuffer();
      for (let i = 0; i < planos.length; i++) {
        rotacaoZ(- Math.PI / 18, planos[i].pontos);
        comparaZbuffer(planos[i]);
      }
      printaZbuffer(zbuffer);
      break;
    case 37:  //<- eixo y
      limpa();
      inicializaZbuffer();
      for (let i = 0; i < planos.length; i++) {
        rotacaoY(-Math.PI / 18, planos[i].pontos);
        comparaZbuffer(planos[i]);
      }
      printaZbuffer(zbuffer);
      break;
    case 38:  //^ eixo x
      limpa();
      inicializaZbuffer();
      for (let i = 0; i < planos.length; i++) {
        rotacaoX(Math.PI / 18, planos[i].pontos);
        comparaZbuffer(planos[i]);
      }
      printaZbuffer(zbuffer);
      break;
    case 39:  //-> eixo y
      limpa();
      inicializaZbuffer();
      for (let i = 0; i < planos.length; i++) {
        rotacaoY(Math.PI / 18, planos[i].pontos);
        comparaZbuffer(planos[i]);
      }
      printaZbuffer(zbuffer);
      break;
    case 40:  //V eixo x
      limpa();
      inicializaZbuffer();
      for (let i = 0; i < planos.length; i++) {
        rotacaoX(-Math.PI / 18, planos[i].pontos);
        comparaZbuffer(planos[i]);
      }
      printaZbuffer(zbuffer);
      break;
  }
}

function main() {
  inicialização();
  for (let i = 0; i < 6; i++) {
    interpolação(planos[i]);
    rotacaoX(-Math.PI / 9, planos[i].pontos);
    rotacaoY(Math.PI / 9, planos[i].pontos);
    comparaZbuffer(planos[i]);
  }
  printaZbuffer();
}

function inicialização() {
  initObjs(planos);
  initPlano0(planos[0]);
  initPlano1(planos[1]);
  initPlano2(planos[2]);
  initPlano3(planos[3]);
  initPlano4(planos[4]);
  initPlano5(planos[5]);
  inicializaZbuffer(zbuffer);
}

function initObjs() {
  for (let i = 0; i < 6; i++) {
    let plano = {
      vertices: [],
      pontos: [],
      cor: '',
    }
    planos.push(plano);
  }
}

function initPlano0(plano) {
  plano.vertices.push({ x: 0, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 0, z: 0 });
  plano.vertices.push({ x: 0, y: 0, z: 60 });
  plano.vertices.push({ x: 60, y: 0, z: 60 });
  plano.cor = 'green'
}
function initPlano1(plano) {
  plano.vertices.push({ x: 60, y: 0, z: 0 });
  plano.vertices.push({ x: 180, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 0, z: 60 });
  plano.vertices.push({ x: 180, y: 0, z: 60 });
  plano.cor = 'red'
}
function initPlano2(plano) {
  plano.vertices.push({ x: 0, y: 0, z: 0 });
  plano.vertices.push({ x: 0, y: 0, z: 60 });
  plano.vertices.push({ x: 0, y: 240, z: 0 });
  plano.vertices.push({ x: 0, y: 240, z: 60 });
  plano.cor = 'blue'
}
function initPlano3(plano) {
  plano.vertices.push({ x: 60, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 240, z: 0 });
  plano.vertices.push({ x: 60, y: 0, z: 60 });
  plano.vertices.push({ x: 60, y: 240, z: 60 });
  plano.cor = 'yellow'
}
function initPlano4(plano) {
  plano.vertices.push({ x: 120, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 240, z: 0 });
  plano.vertices.push({ x: 120, y: 0, z: 60 });
  plano.vertices.push({ x: 60, y: 240, z: 60 });
  plano.cor = 'cyan'
}
function initPlano5(plano) {
  plano.vertices.push({ x: 0, y: 240, z: 0 });
  plano.vertices.push({ x: 60, y: 240, z: 0 });
  plano.vertices.push({ x: 0, y: 240, z: 60 });
  plano.vertices.push({ x: 60, y: 240, z: 60 });
  plano.cor = 'green'
}

function interpolação(plano) {
  for (let u = 0; u <= 1; u += 0.002) {
    for (let v = 0; v <= 1; v += 0.002) {
      let ponto = {
        x: (1 - u) * (1 - v) * plano.vertices[0].x +
          (1 - u) * v * plano.vertices[1].x +
          u * (1 - v) * plano.vertices[2].x +
          u * v * plano.vertices[3].x,
        y: (1 - u) * (1 - v) * plano.vertices[0].y +
          (1 - u) * v * plano.vertices[1].y +
          u * (1 - v) * plano.vertices[2].y +
          u * v * plano.vertices[3].y,
        z: (1 - u) * (1 - v) * plano.vertices[0].z +
          (1 - u) * v * plano.vertices[1].z +
          u * (1 - v) * plano.vertices[2].z +
          u * v * plano.vertices[3].z,
      }
      plano.pontos.push(ponto);
    }
  }
}

function inicializaZbuffer() {
  for (let x = 0; x < canvas.width; x++) {
    zbuffer[x] = [];
    for (let y = 0; y < canvas.height; y++) {
      zbuffer[x][y] = { zmax: -Infinity, cor: 'black' };
    }
  }
}

function comparaZbuffer(obj) {
  for (let i = 0; i < obj.pontos.length; i++) {
    let ponto = {
      x: parseInt(obj.pontos[i].x),
      y: parseInt(obj.pontos[i].y),
      z: parseInt(obj.pontos[i].z)
    };
    if (ponto.z > zbuffer[ponto.x + centro.x][-ponto.y + centro.y].zmax) {
      zbuffer[ponto.x + centro.x][-ponto.y + centro.y].zmax = ponto.z;
      zbuffer[ponto.x + centro.x][-ponto.y + centro.y].cor = obj.cor;
    }
  }
}

function printaZbuffer() {
  for (let x = 0; x < zbuffer.length; x++) {
    for (let y = 0; y < zbuffer[0].length; y++) {
      ctx.fillStyle = zbuffer[x][y].cor;
      ctx.fillRect(x, y, 1, 1);
    }
  }
  ctx.fillStyle = 'black';
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

function rotacaoX(rad, pontos) {
  let matrizTransf = [[1, 0, 0, 0], [0, Math.cos(rad), -Math.sin(rad), 0], [0, Math.sin(rad), Math.cos(rad), 0], [0, 0, 0, 1]];
  for (let i = 0; i < pontos.length; i++) {
    let vet = [];
    vet = multiPontoMatriz([pontos[i].x, pontos[i].y, pontos[i].z, 1], matrizTransf);
    pontos[i].x = vet[0];
    pontos[i].y = vet[1];
    pontos[i].z = vet[2];
  }
}

function rotacaoY(rad, pontos) {
  let matrizTransf = [[Math.cos(rad), 0, Math.sin(rad), 0], [0, 1, 0, 0], [-Math.sin(rad), 0, Math.cos(rad), 0], [0, 0, 0, 1]];
  for (let i = 0; i < pontos.length; i++) {
    let vet = [];
    vet = multiPontoMatriz([pontos[i].x, pontos[i].y, pontos[i].z, 1], matrizTransf);
    pontos[i].x = vet[0];
    pontos[i].y = vet[1];
    pontos[i].z = vet[2];
  }
}

function rotacaoZ(rad, pontos) {
  let matrizTransf = [[Math.cos(rad), -Math.sin(rad), 0, 0], [Math.sin(rad), Math.cos(rad), 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]];
  for (let i = 0; i < pontos.length; i++) {
    let vet = [];
    vet = multiPontoMatriz([pontos[i].x, pontos[i].y, pontos[i].z, 1], matrizTransf);
    pontos[i].x = vet[0];
    pontos[i].y = vet[1];
    pontos[i].z = vet[2];
  }
}

function limpa() {
  ctx.save();
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
