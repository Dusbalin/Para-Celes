let myTurtle;
let drawing = false;

function setup() {
  createCanvas(600, 600);
  background(255);
  myTurtle = new p5.Turtle();
  myTurtle.speed(10); // Más rápido para que lo veas listo pronto
  
  // --- ORDEN DE DIBUJO ---

  // 1. Envoltura Azul (Corregida para que sea idéntica a la foto)
  myTurtle.pencolor("Blue");
  myTurtle.fillcolor("LightBlue");
  myTurtle.go(0, -180); // Punta inferior
  myTurtle.begin_fill();
  myTurtle.seth(140); myTurtle.circle(-300, 40); // Lado izquierdo
  myTurtle.seth(20);  myTurtle.circle(150, 120); // Parte superior curva
  myTurtle.seth(260); myTurtle.circle(-300, 40); // Lado derecho cerrando abajo
  myTurtle.end_fill();

  // Línea divisoria de la envoltura (el detalle del centro)
  myTurtle.go(0, -180);
  myTurtle.seth(95);
  myTurtle.circle(-400, 30);

  // 2. Hojas Verdes
  myTurtle.pencolor("DarkGreen");
  myTurtle.fillcolor("LimeGreen");
  const dHoja = (x, y, a) => {
    myTurtle.go(x, y); myTurtle.begin_fill();
    myTurtle.seth(a); myTurtle.circle(60, 100);
    myTurtle.seth(a + 180); myTurtle.circle(60, 100);
    myTurtle.end_fill();
  };
  dHoja(-90, 80, 150);
  dHoja(-110, 120, 90);
  myTurtle.fillcolor("LawnGreen");
  dHoja(-70, 130, 120);

  // 3. Moño Rosa (Redondito como en la imagen)
  myTurtle.pencolor("MediumVioletRed");
  myTurtle.fillcolor("HotPink");
  // Lado izquierdo del moño
  myTurtle.go(-5, -110);
  myTurtle.begin_fill();
  myTurtle.seth(150); myTurtle.circle(40, 180);
  myTurtle.end_fill();
  // Lado derecho del moño
  myTurtle.go(5, -110);
  myTurtle.begin_fill();
  myTurtle.seth(-30); myTurtle.circle(40, 180);
  myTurtle.end_fill();
  // Nudo central
  myTurtle.go(0, -125);
  myTurtle.begin_fill();
  for(let i=0; i<36; i++) { myTurtle.seth(i*10); myTurtle.circle(15, 10); }
  myTurtle.end_fill();

  // 4. Girasoles (Agrupados y con centros grandes)
  const dFlor = (x, y) => {
    myTurtle.pencolor("Orange");
    myTurtle.fillcolor("Yellow");
    myTurtle.go(x, y);
    myTurtle.begin_fill();
    for(let i=0; i<8; i++) { // 8 pétalos para que se vea tupida
        myTurtle.seth(i*45);
        myTurtle.circle(15, 200);
    }
    myTurtle.end_fill();
    myTurtle.pencolor("SaddleBrown");
    myTurtle.fillcolor("SaddleBrown");
    myTurtle.go(x, y+10);
    myTurtle.begin_fill();
    for(let i=0; i<36; i++) { myTurtle.seth(i*10); myTurtle.circle(12, 10); }
    myTurtle.end_fill();
  };

  dFlor(50, 100);
  dFlor(-30, 90);
  dFlor(10, 130);
  dFlor(80, 50);
  dFlor(-10, 40);

  // 5. Mensaje
  myTurtle.add_queue(() => {
    push(); translate(width/2, height/2);
    fill("Gold"); noStroke(); textAlign(CENTER);
    textSize(40); textStyle(BOLDITALIC);
    text("Te quiero, Celes. Para tu", 0, 240);
    pop();
  });

  drawing = true;
}

function draw() { if (drawing) myTurtle.update(); }

// Motor de la tortuga (Optimizado)
p5.Turtle = function() {
  this.x = 0; this.y = 0; this.angle = 90;
  this._pc = "black"; this._fc = "white"; this._s = 10;
  this.q = []; this.path = []; this.f = false;
  this.go = (x, y) => this.add_queue(() => { this.x = x; this.y = y; if(this.f) this.path.push({x,y}); });
  this.seth = (a) => this.add_queue(() => { this.angle = a; });
  this.pencolor = (c) => this.add_queue(() => { this._pc = c; });
  this.fillcolor = (c) => this.add_queue(() => { this._fc = c; });
  this.begin_fill = () => this.add_queue(() => { this.path = [{x:this.x, y:this.y}]; this.f = true; });
  this.end_fill = () => this.add_queue(() => {
    this.f = false; push(); translate(width/2, height/2); scale(1,-1);
    fill(this._fc); stroke(this._pc); strokeWeight(3);
    beginShape(); for(let p of this.path) vertex(p.x, p.y); endShape(CLOSE); pop();
  });
  this.circle = (r, ext) => {
    let steps = floor(abs(ext)/4) + 1; let sA = ext/steps;
    for(let i=0; i<steps; i++) {
      this.add_queue(() => {
        let ox = this.x, oy = this.y;
        this.angle += sA;
        this.x += (2*r*sin(radians(sA/2))) * cos(radians(this.angle-90+sA/2));
        this.y += (2*r*sin(radians(sA/2))) * sin(radians(this.angle-90+sA/2));
        push(); translate(width/2, height/2); scale(1,-1);
        stroke(this._pc); strokeWeight(3); line(ox, oy, this.x, this.y); pop();
        if(this.f) this.path.push({x:this.x, y:this.y});
      });
    }
  };
  this.add_queue = (fn) => this.q.push(fn);
  this.update = () => { for(let i=0; i<this._s && this.q.length>0; i++) this.q.shift()(); };
};
