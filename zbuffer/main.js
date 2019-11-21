var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var painting = document.getElementById('paint');
var paint_style = getComputedStyle(painting);
canvas.width = parseInt(paint_style.getPropertyValue('width'));
canvas.height = parseInt(paint_style.getPropertyValue('height'));

var obj1 = {
  cor: 'blue',
  pontos: []
};

var obj2 = {
  cor: 'red',
  pontos: []
};

var obj3 = {
  cor: 'yellow',
  pontos: []
};

var obj4 = {
  cor: 'green',
  pontos: []
};

var obj5 = {
  cor: 'white',
  pontos: []
};

var centro = {
  x: parseInt(canvas.width / 2),
  y: parseInt(canvas.height / 2)
}

var zbuffer = [];

function main() {
  pontosObj1();
  pontosObj2();
  pontosObj3();
  pontosObj4();
  pontosObj5();
  inicializaZbuffer();
  comparaZbuffer(obj1);
  comparaZbuffer(obj2);
  comparaZbuffer(obj3);
  comparaZbuffer(obj4);
  comparaZbuffer(obj5);
  printaZbuffer();
}

function pontosObj1() {
  for (let x = 10; x < 30; x++) {
    for (let y = 20; y < 40; y++) {
      let ponto = {
        x: x,
        y: y,
        z: x ** 2 + y
      };
      obj1.pontos.push(ponto);
    }
  }
}

function pontosObj2() {
  for (let x = 50; x < 100; x++) {
    for (let y = 30; y < 80; y++) {
      let ponto = {
        x: x,
        y: y,
        z: 3 * x - 2 * y + 5
      }
      obj2.pontos.push(ponto);
    }
  }
}

function pontosObj3() {
  for (let alfa = 0; alfa < Math.PI * 2; alfa += 0.01) {
    for (let t = 0; t < 50; t++) {
      let ponto = {
        x: parseInt(30 + t * Math.cos(alfa)),
        y: parseInt(50 + t * Math.sin(alfa)),
        z: parseInt(10 * t)
      }
      obj3.pontos.push(ponto);
    }
  }
}

function pontosObj4() {
  for (let alfa = 0; alfa < 2 * Math.PI; alfa += 0.01) {
    for (let beta = 0; beta < 2 * Math.PI; beta += 0.01) {
      let ponto = {
        x: parseInt(100 + 30 * Math.cos(alfa) * Math.cos(beta)),
        y: parseInt(50 + 30 * Math.cos(alfa) * Math.sin(beta)),
        z: parseInt(20 + 30 * Math.sin(alfa))
      }
      obj4.pontos.push(ponto);
    }
  }
}

function pontosObj5() {
  for (let x = -20; x < 20; x++) {
    for (let y = -20; y < 20; y++) {
      for (let z = -20; z < 20; z++) {
        let ponto = {
          x: x,
          y: y,
          z: z
        }
        obj5.pontos.push(ponto);
      }
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
      x: obj.pontos[i].x,
      y: obj.pontos[i].y,
      z: obj.pontos[i].z
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