var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var esfera = {
  centro: [canvas.width / 2, canvas.height / 2, 0],
  pontos: [],
  raio: 50,
  cor: [255, 0, 255],
  kd: 0.3,
  ks: 0.8
}

var plano = {
  inicio: [0, 0, 0],
  fim: [100, 100, 0],
  pontos: [],
  cor: [0, 0, 255],
  kd: 0.7,
  ks: 0.4
}

var luz = {
  ponto: [canvas.width / 2 + 100, canvas.height / 2, 100],
  ia: 0.5,
  il: 0.7,
  ka: 0.5
}

var observador = {
  ponto: [canvas.width / 2, canvas.height / 2, 100]
}

var zbuffer = [];

function main() {
  pontosEsfera();
  pontosPlano();
  inicializaZbuffer();
  comparaZbuffer(esfera);
  comparaZbuffer(plano);
  printaZbuffer();
}

function pontosEsfera() {
  for (let a = -Math.PI / 2; a < Math.PI / 2; a += 0.02) {
    for (let b = -Math.PI; b < Math.PI; b += 0.02) {
      let coord = { x: 0, y: 0, z: 0 };
      coord.x = parseInt(esfera.raio * Math.cos(a) * Math.cos(b) + canvas.width / 2);
      coord.y = parseInt(esfera.raio * Math.cos(a) * Math.sin(b) + canvas.height / 2);
      coord.z = parseInt(esfera.raio * Math.sin(a));
      esfera.pontos.push(coord);
    }
  }
}

function pontosPlano() {
  for (let i = plano.inicio[0]; i < plano.fim[0]; i++)
    for (let j = plano.inicio[1]; j < plano.fim[1]; j++)
      plano.pontos.push({ x: parseInt(i + canvas.width / 2), y: parseInt(-j + canvas.height / 2), z: 0 });
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
  let novaCor = [];
  for (let i = 0; i < obj.pontos.length; i++) {
    if (obj.pontos[i].z > zbuffer[obj.pontos[i].x][obj.pontos[i].y].zmax) {
      zbuffer[obj.pontos[i].x][obj.pontos[i].y].zmax = obj.pontos[i].z;
      // novaCor = iluminaçãoPonto(obj.pontos[i], obj.cor);
      novaCor = iluminaçãoPontoEspecular(obj.pontos[i], obj.cor);
      zbuffer[obj.pontos[i].x][obj.pontos[i].y].cor = `RGB(${novaCor[0]}, ${novaCor[1]}, ${novaCor[2]})`;
    }
  }
}

function printaZbuffer() {
  for (let x = 0; x < zbuffer.length; x++) {
    for (let y = 0; y < zbuffer[0].length; y++) {
      ctx.fillStyle = zbuffer[x][y].cor;
      ctx.fillRect(x, y, 1, 1);
      if (zbuffer[x][y].cor !== 'black') {

      }
    }
  }
  ctx.fillStyle = 'black';
}

function iluminaçãoPonto(ponto, cor) {
  let vNormal = [], vLuz = [], novaCor = [];
  let cos, intensidade, obj;
  if (cor[0] == 255) {
    vNormal[0] = ponto.x - esfera.centro[0];
    vNormal[1] = ponto.y - esfera.centro[1];
    vNormal[2] = ponto.z - esfera.centro[2];
    obj = 0;
  }
  else {
    vNormal = [0, 0, 1];
    obj = 1;
  }
  vLuz[0] = luz.ponto[0] - ponto.x;
  vLuz[1] = luz.ponto[1] - ponto.y;
  vLuz[2] = luz.ponto[2] - ponto.z;
  cos = ((vNormal[0] * vLuz[0]) + (vNormal[1] * vLuz[1]) + (vNormal[2] * vLuz[2])) /
    ((Math.sqrt(Math.pow(vNormal[0], 2) + Math.pow(vNormal[1], 2) + Math.pow(vNormal[2], 2))) *
      (Math.sqrt(Math.pow(vLuz[0], 2) + Math.pow(vLuz[1], 2) + Math.pow(vLuz[2], 2))));
  if (obj === 0)
    intensidade = (luz.ia * luz.ka) + (luz.il * esfera.kd * cos);
  else
    intensidade = (luz.ia * luz.ka) + (luz.il * plano.kd * cos);
  novaCor[0] = parseInt(cor[0] * intensidade);
  novaCor[1] = parseInt(cor[1] * intensidade);
  novaCor[2] = parseInt(cor[2] * intensidade);
  return (novaCor);
}

function iluminaçãoPontoEspecular(ponto, cor) {
  let vNormal = [], vLuz = [], novaCor = [], vS = [], vReflexao = [];
  let cosAlfa, cosTeta, intensidade, obj, aux;
  if (cor[0] == 255) {
    vNormal[0] = ponto.x - esfera.centro[0];
    vNormal[1] = ponto.y - esfera.centro[1];
    vNormal[2] = ponto.z - esfera.centro[2];
    obj = 0;
  }
  else {
    vNormal = [0, 0, 1];
    obj = 1;
  }
  vLuz[0] = luz.ponto[0] - ponto.x;
  vLuz[1] = luz.ponto[1] - ponto.y;
  vLuz[2] = luz.ponto[2] - ponto.z;

  vS[0] = observador.ponto[0] - ponto.x;
  vS[1] = observador.ponto[1] - ponto.y;
  vS[2] = observador.ponto[2] - ponto.z;

  aux = (vNormal[0] * vLuz[0]) + (vNormal[1] * vLuz[1]) + (vNormal[2] * vLuz[2]);
  for (let i = 0; i < 3; i++) {
    vReflexao[i] = aux * vNormal[i];
    vReflexao[i] -= vLuz[i];
  }

  vNormal = normalizar(vNormal);
  vLuz = normalizar(vLuz);
  vS = normalizar(vS);
  vReflexao = normalizar(vReflexao);

  d = Math.sqrt(Math.pow(ponto.x - observador.ponto[0], 2) + Math.pow(ponto.y - observador.ponto[1], 2) + Math.pow(ponto.z - observador.ponto[2], 2)) / 200;

  cosTeta = ((vNormal[0] * vLuz[0]) + (vNormal[1] * vLuz[1]) + (vNormal[2] * vLuz[2])) /
    ((Math.sqrt(Math.pow(vNormal[0], 2) + Math.pow(vNormal[1], 2) + Math.pow(vNormal[2], 2))) *
      (Math.sqrt(Math.pow(vLuz[0], 2) + Math.pow(vLuz[1], 2) + Math.pow(vLuz[2], 2))));
  cosAlfa = ((vReflexao[0] * vS[0]) + (vReflexao[1] * vS[1]) + (vReflexao[2] * vS[2])) /
    ((Math.sqrt(Math.pow(vReflexao[0], 2) + Math.pow(vReflexao[1], 2) + Math.pow(vReflexao[2], 2))) *
      (Math.sqrt(Math.pow(vS[0], 2) + Math.pow(vS[1], 2) + Math.pow(vS[2], 2))));

  if (obj === 0)
    intensidade = (luz.ia * luz.ka) + ((luz.il / d) * (esfera.kd * cosTeta) + (esfera.ks * cosAlfa ** 50));
  else {
    intensidade = (luz.ia * luz.ka) + ((luz.il / d) * (plano.kd * cosTeta) + (plano.ks * cosAlfa ** 5));
  }
  novaCor[0] = parseInt(cor[0] * intensidade);
  novaCor[1] = parseInt(cor[1] * intensidade);
  novaCor[2] = parseInt(cor[2] * intensidade);
  return (novaCor);
}

function norma(ponto) {
  return Math.sqrt(Math.pow(ponto[0], 2) + Math.pow(ponto[1], 2) + Math.pow(ponto[2], 2));
}

function normalizar(vetor) {
  let normaAux = norma(vetor);
  vetor[0] /= normaAux;
  vetor[1] /= normaAux;
  vetor[2] /= normaAux;
  return vetor;
}

//2n.l(escalar) * n
//vetor - L = R

// I = ia * ka + (il * kd * cos(O));