let myTurtle;
let drawing = false;

function setup() {
  createCanvas(600, 600);
  background(255);
  myTurtle = new p5.Turtle();
  myTurtle.speed(12); // Velocidad alta para que termine rápido
  drawing = true;

  // 1. ENVOLTURA AZUL (La base del ramo)
  myTurtle.pencolor("Blue");
  myTurtle.fillcolor("LightBlue");
  myTurtle.go(0, -180); // Punta inferior
  myTurtle.begin_fill();
  myTurtle.seth(145); myTurtle.circle(-350, 45); // Lado izquierdo
  myTurtle.seth(15);  myTurtle.circle(160, 130); // Parte superior
  myTurtle.seth(255); myTurtle.circle(-350, 45); // Lado derecho
  myTurtle.end_fill();

  // 2. HOJAS VERDES
  myTurtle.pencolor("DarkGreen");
  myTurtle.fillcolor("LimeGreen");
  const dHoja = (x, y, a) => {
    myTurtle.go(x, y); myTurtle.begin_fill();
    myTurtle.seth(a); myTurtle.circle(60, 100);
    myTurtle.seth(a + 180); myTurtle.circle(60, 100);
    myTurtle.end_fill();
  };
  dHoja(-95, 85, 160);
  dHoja(-115, 125, 95);
  myTurtle.fillcolor("LawnGreen");
  dHoja(-75, 135, 125);

  // 3. MOÑO ROSA (Redondito como la foto)
  myTurtle.pencolor("MediumVioletRed");
  myTurtle.fillcolor("HotPink");
  // Lazo izquierdo
  myTurtle.go(-5, -115);
  myTurtle.begin_fill();
  myTurtle.seth(150); myTurtle.circle(40, 200);
  myTurtle.end_fill();
  // Lazo derecho
  myTurtle.go(5, -115);
  myTurtle.begin_fill();
  myTurtle.seth(-20); myTurtle.circle(40, 200);
  myTurtle.end_fill();
  // Nudo
  myTurtle.go(0, -130);
  myTurtle.begin_fill();
  for(let i=0; i<36; i++) { myTurtle.seth(i*10); myTurtle.circle(18, 10); }
  myTurtle.end_fill();

  // 4. GIRASOLES (Tupidos y amarillos)
  const dFlor = (x, y) => {
    myTurtle.pencolor("Orange");
    myTurtle.fillcolor("Yellow");
    myTurtle.go(x, y);
    myTurtle.begin_fill();
    for(let i=0; i<8; i++) { 
      myTurtle.seth(i*45); 
      myTurtle.circle(18, 210); 
    }
    myTurtle.end_fill();
    // Centro café grande
    myTurtle.pencolor("SaddleBrown");
    myTurtle.fillcolor("SaddleBrown");
    myTurtle.go(x, y + 12);
    myTurtle.begin_fill();
    for(let i=0; i<36; i++) { myTurtle.seth(i*10); myTurtle.circle(15, 10); }
    myTurtle.end_fill();
  };

  // Posiciones de las flores según tu imagen
  dFlor(55, 105);
  dFlor(-35, 95);
  dFlor(15, 135);
  dFlor(85, 55);
  dFlor(-15, 45);

  // 5. MENSAJE FINAL
  myTurtle.add_q(() => {
    push(); translate(width/2, height/2);
    fill("Gold"); noStroke(); textAlign(CENTER);
    textSize(35); textStyle(BOLDITALIC);
    text("Te quiero, Celes.", 0, 240); pop();
  });
}

function draw() { if (drawing) myTurtle.update(); }

// MOTOR DE LA TORTUGA (ESTABILIZADO)
p5.Turtle = function() {
  this.x = 0; this.y = 0; this.angle = 90; this._pc = "black"; this._fc = "white"; this._s = 12;
  this.q = []; this.path = []; this.f = false;
  this.go = (x,y) => this.add_q(() => { this.x=x; this.y=y; if(this.f) this.path.push({x,y}); });
  this.seth = (a) => this.add_q(() => { this.angle=a; });
  this.pencolor = (c) => this.add_q(() => { this._pc=c; });
  this.fillcolor = (c) => this.add_q(() => { this._fc=c; });
  this.begin_fill = () => this.add_q(() => { this.path=[{x:this.x,y:this.y}]; this.f=true; });
  this.end_fill = () => this.add_q(() => {
    this.f=false; push(); translate(width/2, height/2); scale(1,-1);
    fill(this._fc); stroke(this._pc); strokeWeight(3);
    beginShape(); for(let p of this.path) vertex(p.x, p.y); endShape(CLOSE); pop();
  });
  this.circle = (r, ext) => {
    let steps = floor(abs(ext)/5) + 1; let sA = ext/steps;
    for(let i=0; i<steps; i++) {
      this.add_q(() => {
        let ox=this.x, oy=this.y; this.angle += sA;
        this.x += (2*r*sin(radians(sA/2))) * cos(radians(this.angle-90+sA/2));
        this.y += (2*r*sin(radians(sA/2))) * sin(radians(this.angle-90+sA/2));
        push(); translate(width/2, height/2); scale(1,-1);
        stroke(this._pc); strokeWeight(3); line(ox, oy, this.x, this.y); pop();
        if(this.f) this.path.push({x:this.x, y:this.y});
      });
    }
  };
  this.add_q = (fn) => this.q.push(fn);
  this.update = () => { for(let i=0; i<this._s && this.q.length>0; i++) (this.q.shift())(); };
};
