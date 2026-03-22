let myTurtle;
let drawQueue = [];
let drawing = false;

function setup() {
  createCanvas(600, 600);
  background(255);
  translate(width / 2, height / 2); // Centro de la pantalla
  scale(1, -1); // Invertir eje Y (como Turtle)
  
  myTurtle = new p5.Turtle();
  myTurtle.pensize(4);
  myTurtle.speed(2); // Ajusta la velocidad aquí (1 es más lento, 10 más rápido)

  // --- DEFINIR EL DIBUJO ---
  
  // 1. Envoltura del Ramo (Azul)
  myTurtle.pencolor("Blue");
  myTurtle.fillcolor("LightBlue");
  myTurtle.go(40.03, -167.53);
  myTurtle.begin_fill();
  myTurtle.seth(104.91);
  myTurtle.circle(120.54, 29.94);
  myTurtle.seth(49.57);
  myTurtle.circle(-315.30, 15.58);
  myTurtle.seth(33.99);
  myTurtle.circle(172.07, 64.94);
  myTurtle.seth(185.9);
  myTurtle.circle(227.51, 53.26);
  myTurtle.seth(239.17);
  myTurtle.circle(99.15, 72.41);
  myTurtle.seth(213.64);
  myTurtle.circle(74.25, 50.32);
  myTurtle.seth(336.29);
  myTurtle.circle(108.41, 47.43);
  myTurtle.end_fill();

  myTurtle.go(-37.02, -69.53);
  myTurtle.begin_fill();
  myTurtle.seth(98.75);
  myTurtle.circle(-121.74, 54.75);
  myTurtle.seth(131.6);
  myTurtle.circle(187.54, 48.16);
  myTurtle.seth(253.4);
  myTurtle.circle(134.51, 95.25);
  myTurtle.end_fill();

  // 2. Moño Rosa
  myTurtle.pencolor("MediumVioletRed");
  myTurtle.fillcolor("HotPink");
  myTurtle.go(69.69, -55.52);
  myTurtle.begin_fill();
  myTurtle.seth(184.72);
  myTurtle.circle(90.59, 53.66);
  myTurtle.seth(127.63);
  myTurtle.circle(111.93, 45.5);
  myTurtle.seth(234.89);
  myTurtle.circle(80.10, 70.23);
  myTurtle.seth(9.8);
  myTurtle.circle(152.91, 31.68);
  myTurtle.seth(311.3);
  myTurtle.circle(108.05, 42.6);
  myTurtle.seth(58.45);
  myTurtle.circle(88.07, 63.09);
  myTurtle.end_fill();

  myTurtle.go(16.3, -99.27);
  myTurtle.begin_fill();
  myTurtle.seth(90);
  myTurtle.circle(19.5);
  myTurtle.end_fill();

  // 3. Hojas
  function hojas(angulo, y) {
    myTurtle.begin_fill();
    myTurtle.seth(angulo);
    myTurtle.circle(75.61, 121.08);
    myTurtle.seth(angulo + 175.63);
    myTurtle.circle(72.70, 129.82);
    myTurtle.end_fill();
  }

  myTurtle.pencolor("DarkGreen");
  myTurtle.fillcolor("LimeGreen");
  myTurtle.go(-79.30, 110.03);
  hojas(165.01);
  myTurtle.go(-122.12, 151);
  hojas(79.67);

  myTurtle.fillcolor("LawnGreen");
  myTurtle.go(-100.51, 123.98);
  hojas(119.46);
  myTurtle.go(-90.46, 135.14);
  hojas(22.07);

  // 4. Flores
  function flor(x, y) {
    // Pétalos amarillos
    myTurtle.pencolor("Orange");
    myTurtle.fillcolor("Yellow");
    myTurtle.go(x, y);
    myTurtle.begin_fill();
    myTurtle.seth(330.2);
    myTurtle.circle(22.66, 236.14);
    myTurtle.seth(42.2);
    myTurtle.circle(22.66, 236.14);
    myTurtle.seth(114.2);
    myTurtle.circle(22.66, 236.14);
    myTurtle.seth(186.2);
    myTurtle.circle(22.66, 236.14);
    myTurtle.seth(258.2);
    myTurtle.circle(22.66, 236.14);
    myTurtle.end_fill();
    
    // Centro café
    myTurtle.pencolor("SaddleBrown");
    myTurtle.fillcolor("SaddleBrown");
    myTurtle.go(x - 4.81, y + 20.88);
    myTurtle.begin_fill();
    myTurtle.seth(90);
    myTurtle.circle(22.5);
    myTurtle.end_fill();
  }

  flor(155.36, 115.58);
  flor(60.97, 170);
  flor(-45.377, 120);
  flor(-11.60, 41.39);
  flor(65.71, 85.27);

  // 5. Texto
  myTurtle.add_queue_item(() => {
    push();
    scale(1, -1); // Voltear texto
    noStroke();
    fill("Gold");
    textAlign(CENTER);
    textSize(25);
    textStyle(BOLDITALIC);
    text("Te quiero, Celes. Para tu", 0, 270);
    pop();
  });
  
  drawing = true;
}

function draw() {
  if (drawing) {
    myTurtle.update();
  }
}

// --- CLASE TURTLE PERSONALIZADA PARA P5.JS ---
p5.Turtle = function() {
  this.x = 0;
  this.y = 0;
  this.angle = 90; // Arriba
  this.is_drawing = false;
  this._pensize = 1;
  this._pencolor = "black";
  this._fillcolor = "white";
  this._speed = 1;
  this.queue = [];
  this.isFillEnabled = false;
  this.fillPath = [];

  this.go = (x, y) => {
    this.add_queue_item(() => { this.x = x; this.y = y; this.fillPath.push({x: this.x, y: this.y}); });
  };

  this.penup = () => {
    this.add_queue_item(() => { this.is_drawing = false; });
  };

  this.pendown = () => {
    this.add_queue_item(() => { this.is_drawing = true; });
  };

  this.seth = (angle) => {
    this.add_queue_item(() => { this.angle = angle; });
  };

  this.pensize = (size) => {
    this.add_queue_item(() => { this._pensize = size; });
  };

  this.pencolor = (color) => {
    this.add_queue_item(() => { this._pencolor = color; });
  };

  this.fillcolor = (color) => {
    this.add_queue_item(() => { this._fillcolor = color; });
  };

  this.begin_fill = () => {
    this.add_queue_item(() => { this.isFillEnabled = true; this.fillPath = [{x: this.x, y: this.y}]; });
  };

  this.end_fill = () => {
    this.add_queue_item(() => {
      this.isFillEnabled = false;
      push();
      translate(width / 2, height / 2); scale(1, -1);
      noStroke(); fill(this._fillcolor);
      beginShape();
      for (let p of this.fillPath) vertex(p.x, p.y);
      endShape(CLOSE);
      pop();
    });
  };

  this.circle = (radius, extent) => {
    let steps = floor(abs(extent) / (this._speed * 2)) + 1;
    let stepAngle = extent / steps;
    let stepLen = 2 * radius * sin(radians(stepAngle / 2));

    for (let i = 0; i < steps; i++) {
      this.add_queue_item(() => {
        let oldX = this.x;
        let oldY = this.y;
        this.angle += stepAngle;
        this.x += stepLen * cos(radians(this.angle - 90 + stepAngle / 2));
        this.y += stepLen * sin(radians(this.angle - 90 + stepAngle / 2));
        
        if (this.is_drawing) {
          push();
          translate(width / 2, height / 2); scale(1, -1);
          strokeWeight(this._pensize); stroke(this._pencolor);
          line(oldX, oldY, this.x, this.y);
          pop();
        }
        if (this.isFillEnabled) this.fillPath.push({x: this.x, y: this.y});
      });
    }
  };

  this.speed = (speed) => {
    this._speed = constrain(speed, 1, 10);
  };

  this.add_queue_item = (f) => {
    this.queue.push(f);
  };

  this.update = () => {
    if (this.queue.length > 0) {
      let f = this.queue.shift();
      f();
    }
  };
};
