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
  initPlano0(planos[1]);
  initPlano0(planos[2]);
  initPlano0(planos[3]);
  initPlano0(planos[4]);
  initPlano0(planos[5]);
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
  plano.vertices = [
    [0, 0, 0],
    [20, 0, 0],
    [0, 20, 0],
    [20, 20, 0]
  ]
  plano.cor = 'green'
}
function initPlano1(plano) {
  plano.vertices = [
    [20, 0, 0],
    [60, 0, 0],
    [20, 0, 20],
    [60, 0, 20]
  ]
  plano.cor = 'red'
}
function initPlano2(plano) {
  plano.vertices = [
    [0, 0, 0],
    [0, 0, 20],
    [0, 80, 0],
    [0, 80, 20]
  ]
  plano.cor = 'blue'
}
function initPlano3(plano) {
  plano.vertices = [
    [20, 0, 0],
    [20, 80, 0],
    [20, 0, 20],
    [20, 80, 20]
  ]
  plano.cor = 'yellow'
}
function initPlano4(plano) {
  plano.vertices = [
    [40, 0, 0],
    [20, 80, 0],
    [40, 0, 20],
    [20, 80, 20]
  ]
  plano.cor = 'ciano'
}
function initPlano5(plano) {
  plano.vertices = [
    [0, 80, 0],
    [20, 80, 0],
    [0, 80, 20],
    [20, 80, 20]
  ]
  plano.cor = 'green'
}