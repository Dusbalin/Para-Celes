let myTurtle;
let drawing = false;

function setup() {
  createCanvas(600, 600);
  background(255);
  
  myTurtle = new p5.Turtle();
  myTurtle.speed(8); // Un poco más rápido para que veas el resultado
  
  // --- DEFINICIÓN DEL DIBUJO (ORDENADO POR CAPAS) ---
  
  // 1. Envoltura (Al fondo)
  myTurtle.pencolor("Blue");
  myTurtle.fillcolor("LightBlue");
  myTurtle.go(40.03, -167.53);
  myTurtle.begin_fill();
  myTurtle.seth(104.91); myTurtle.circle(120.54, 29.94);
  myTurtle.seth(49.57); myTurtle.circle(-315.30, 15.58);
  myTurtle.seth(33.99); myTurtle.circle(172.07, 64.94);
  myTurtle.seth(185.9); myTurtle.circle(227.51, 53.26);
  myTurtle.seth(239.17); myTurtle.circle(99.15, 72.41);
  myTurtle.seth(213.64); myTurtle.circle(74.25, 50.32);
  myTurtle.seth(336.29); myTurtle.circle(108.41, 47.43);
  myTurtle.end_fill();

  myTurtle.go(-37.02, -69.53);
  myTurtle.begin_fill();
  myTurtle.seth(98.75); myTurtle.circle(-121.74, 54.75);
  myTurtle.seth(131.6); myTurtle.circle(187.54, 48.16);
  myTurtle.seth(253.4); myTurtle.circle(134.51, 95.25);
  myTurtle.end_fill();

  // 2. Hojas
  myTurtle.pencolor("DarkGreen");
  myTurtle.fillcolor("LimeGreen");
  const dibujarHoja = (x, y, ang) => {
    myTurtle.go(x, y);
    myTurtle.begin_fill();
    myTurtle.seth(ang); myTurtle.circle(75.61, 121.08);
    myTurtle.seth(ang + 175.63); myTurtle.circle(72.70, 129.82);
    myTurtle.end_fill();
  };
  dibujarHoja(-79.30, 110.03, 165.01);
  dibujarHoja(-122.12, 151, 79.67);
  myTurtle.fillcolor("LawnGreen");
  dibujarHoja(-100.51, 123.98, 119.46);
  dibujarHoja(-90.46, 135.14, 22.07);

  // 3. Moño (Encima del azul)
  myTurtle.pencolor("MediumVioletRed");
  myTurtle.fillcolor("HotPink");
  myTurtle.go(69.69, -55.52);
  myTurtle.begin_fill();
  myTurtle.seth(184.72); myTurtle.circle(90.59, 53.66);
  myTurtle.seth(127.63); myTurtle.circle(111.93, 45.5);
  myTurtle.seth(234.89); myTurtle.circle(80.10, 70.23);
  myTurtle.seth(9.8); myTurtle.circle(152.91, 31.68);
  myTurtle.seth(311.3); myTurtle.circle(108.05, 42.6);
  myTurtle.seth(58.45); myTurtle.circle(88.07, 63.09);
  myTurtle.end_fill();

  myTurtle.go(16.3, -99.27);
  myTurtle.begin_fill();
  myTurtle.seth(0);
  for(let i=0; i<36; i++){ myTurtle.seth(i*10); myTurtle.circle(19.5, 10); }
  myTurtle.end_fill();

  // 4. Flores (Al frente de todo)
  const dibujarFlor = (x, y) => {
    myTurtle.pencolor("Orange");
    myTurtle.fillcolor("Yellow");
    myTurtle.go(x, y);
    myTurtle.begin_fill();
    let angs = [330.2, 42.2, 114.2, 186.2, 258.2];
    for(let a of angs) { myTurtle.seth(a); myTurtle.circle(22.66, 236.14); }
    myTurtle.end_fill();
    myTurtle.pencolor("SaddleBrown");
    myTurtle.fillcolor("SaddleBrown");
    myTurtle.go(x - 4.81, y + 20.88);
    myTurtle.begin_fill();
    for(let i=0; i<36; i++){ myTurtle.seth(i*10); myTurtle.circle(22.5, 10); }
    myTurtle.end_fill();
  };

  dibujarFlor(155.36, 115.58);
  dibujarFlor(60.97, 170);
  dibujarFlor(-45.377, 120);
  dibujarFlor(-11.60, 41.39);
  dibujarFlor(65.71, 85.27);

  // 5. Mensaje
  myTurtle.add_queue(() => {
    push(); translate(width/2, height/2);
    fill("Gold"); noStroke(); textAlign(CENTER);
    textSize(32); textStyle(BOLDITALIC);
    text("Te quiero, Celes.", 0, 250); pop();
  });

  drawing = true;
}

function draw() { if (drawing) myTurtle.update(); }

// --- MOTOR DE LA TORTUGA (ESTABLE) ---
p5.Turtle = function() {
  this.x = 0; this.y = 0; this.angle = 90;
  this._pcolor = "black"; this._fcolor = "white"; this._speed = 8;
  this.queue = []; this.path = []; this.filling = false;

  this.go = (x, y) => this.add_queue(() => { this.x = x; this.y = y; if(this.filling) this.path.push({x,y}); });
  this.seth = (a) => this.add_queue(() => { this.angle = a; });
  this.pencolor = (c) => this.add_queue(() => { this._pcolor = c; });
  this.fillcolor = (c) => this.add_queue(() => { this._fcolor = c; });
  this.begin_fill = () => this.add_queue(() => { this.path = [{x:this.x, y:this.y}]; this.filling = true; });
  this.end_fill = () => this.add_queue(() => {
    this.filling = false; push(); translate(width/2, height/2); scale(1,-1);
    fill(this._fcolor); stroke(this._pcolor); strokeWeight(4);
    beginShape(); for(let p of this.path) vertex(p.x, p.y); endShape(CLOSE); pop();
  });

  this.circle = (r, ext) => {
    let steps = floor(abs(ext)/6) + 1;
    let sAng = ext/steps;
    for(let i=0; i<steps; i++) {
      this.add_queue(() => {
        let ox = this.x, oy = this.y;
        this.angle += sAng;
        this.x += (2*r*sin(radians(sAng/2))) * cos(radians(this.angle-90+sAng/2));
        this.y += (2*r*sin(radians(sAng/2))) * sin(radians(this.angle-90+sAng/2));
        push(); translate(width/2, height/2); scale(1,-1);
        stroke(this._pcolor); strokeWeight(4); line(ox, oy, this.x, this.y); pop();
        if(this.filling) this.path.push({x:this.x, y:this.y});
      });
    }
  };

  this.speed = (s) => this._speed = s;
  this.add_queue = (f) => this.queue.push(f);
  this.update = () => { for(let i=0; i<this._speed && this.queue.length>0; i++) (this.queue.shift())(); };
};
