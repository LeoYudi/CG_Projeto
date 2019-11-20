var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

function main() {
  planos = [];
  initObjs(planos);
  initPlano0(planos[0]);
  initPlano1(planos[1]);
  initPlano2(planos[2]);
  initPlano3(planos[3]);
  initPlano4(planos[4]);
  initPlano5(planos[5]);
  interpolação(planos[0]);
  console.log(planos[0]);
}

function initObjs(planos) {
  for (let i = 0; i < 6; i++) {
    planos[i] = {
      vertices: [],
      pontos: [],
      cor: '',
    }
  }
}

function initPlano0(plano) {
  plano.vertices.push({ x: 0, y: 0, z: 0 });
  plano.vertices.push({ x: 20, y: 0, z: 0 });
  plano.vertices.push({ x: 0, y: 20, z: 0 });
  plano.vertices.push({ x: 20, y: 20, z: 0 });
  plano.cor = 'green'
}
function initPlano1(plano) {
  plano.vertices.push({ x: 20, y: 0, z: 0 });
  plano.vertices.push({ x: 60, y: 0, z: 0 });
  plano.vertices.push({ x: 20, y: 0, z: 20 });
  plano.vertices.push({ x: 60, y: 0, z: 20 });
  plano.cor = 'red'
}
function initPlano2(plano) {
  plano.vertices.push({ x: 0, y: 0, z: 0 });
  plano.vertices.push({ x: 0, y: 0, z: 20 });
  plano.vertices.push({ x: 0, y: 80, z: 0 });
  plano.vertices.push({ x: 0, y: 80, z: 20 });
  plano.cor = 'blue'
}
function initPlano3(plano) {
  plano.vertices.push({ x: 20, y: 0, z: 0 });
  plano.vertices.push({ x: 20, y: 80, z: 0 });
  plano.vertices.push({ x: 20, y: 0, z: 20 });
  plano.vertices.push({ x: 20, y: 80, z: 20 });
  plano.cor = 'yellow'
}
function initPlano4(plano) {
  plano.vertices.push({ x: 40, y: 0, z: 0 });
  plano.vertices.push({ x: 20, y: 80, z: 0 });
  plano.vertices.push({ x: 40, y: 0, z: 20 });
  plano.vertices.push({ x: 20, y: 80, z: 20 });
  plano.cor = 'ciano'
}
function initPlano5(plano) {
  plano.vertices.push({ x: 0, y: 80, z: 0 });
  plano.vertices.push({ x: 20, y: 80, z: 0 });
  plano.vertices.push({ x: 0, y: 80, z: 20 });
  plano.vertices.push({ x: 20, y: 80, z: 20 });
  plano.cor = 'green'
}

function interpolação(plano) {
  for (let u = 0; u <= 1; u += 0.01) {
    for (let v = 0; v <= 1; v += 0.01) {
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