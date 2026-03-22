let myTurtle;
let drawing = false;

function setup() {
  createCanvas(600, 600);
  background(255);
  myTurtle = new p5.Turtle();
  myTurtle.speed(8); // Un poco más rápido para que no desespere
  
  // --- INSTRUCCIONES ---
  
  // 1. Envoltura Azul (Al fondo)
  myTurtle.pencolor("Blue");
  myTurtle.fillcolor("LightBlue");
  myTurtle.go(40, -167);
  myTurtle.begin_fill();
  myTurtle.seth(104); myTurtle.circle(120, 30);
  myTurtle.seth(50); myTurtle.circle(-315, 15);
  myTurtle.seth(34); myTurtle.circle(172, 65);
  myTurtle.seth(185); myTurtle.circle(227, 53);
  myTurtle.seth(239); myTurtle.circle(99, 72);
  myTurtle.seth(213); myTurtle.circle(74, 50);
  myTurtle.seth(336); myTurtle.circle(108, 47);
  myTurtle.end_fill();

  myTurtle.go(-37, -69);
  myTurtle.begin_fill();
  myTurtle.seth(98); myTurtle.circle(-121, 54);
  myTurtle.seth(131); myTurtle.circle(187, 48);
  myTurtle.seth(253); myTurtle.circle(134, 95);
  myTurtle.end_fill();

  // 2. Hojas
  myTurtle.pencolor("DarkGreen");
  myTurtle.fillcolor("LimeGreen");
  const dHoja = (x,y,a) => {
    myTurtle.go(x,y); myTurtle.begin_fill();
    myTurtle.seth(a); myTurtle.circle(75, 121);
    myTurtle.seth(a+175); myTurtle.circle(72, 130);
    myTurtle.end_fill();
  }
  dHoja(-79, 110, 165);
  dHoja(-122, 151, 80);
  myTurtle.fillcolor("LawnGreen");
  dHoja(-100, 124, 119);
  dHoja(-90, 135, 22);

  // 3. Moño (Encima de la envoltura)
  myTurtle.pencolor("MediumVioletRed");
  myTurtle.fillcolor("HotPink");
  myTurtle.go(69, -55);
  myTurtle.begin_fill();
  myTurtle.seth(184); myTurtle.circle(90, 53);
  myTurtle.seth(127); myTurtle.circle(111, 45);
  myTurtle.seth(234); myTurtle.circle(80, 70);
  myTurtle.seth(9); myTurtle.circle(152, 31);
  myTurtle.seth(311); myTurtle.circle(108, 42);
  myTurtle.seth(58); myTurtle.circle(88, 63);
  myTurtle.end_fill();

  myTurtle.go(16, -99);
  myTurtle.begin_fill();
  myTurtle.seth(90); myTurtle.circle(19, 360);
  myTurtle.end_fill();

  // 4. Flores (Al frente de todo)
  const dFlor = (x, y) => {
    myTurtle.pencolor("Orange");
    myTurtle.fillcolor("Yellow");
    myTurtle.go(x, y);
    myTurtle.begin_fill();
    for(let i=0; i<5; i++) { 
        myTurtle.seth(330 + (i*72)); 
        myTurtle.circle(22, 236); 
    }
    myTurtle.end_fill();
    myTurtle.pencolor("SaddleBrown");
    myTurtle.fillcolor("SaddleBrown");
    myTurtle.go(x-4, y+20);
    myTurtle.begin_fill();
    myTurtle.circle(22, 360);
    myTurtle.end_fill();
  }
  dFlor(155, 115);
  dFlor(60, 170);
  dFlor(-45, 120);
  dFlor(-11, 41);
  dFlor(65, 85);

  // 5. Texto
  myTurtle.add_queue(() => {
    push(); translate(width/2, height/2);
    fill("Gold"); noStroke(); textAlign(CENTER);
    textSize(28); textStyle(BOLDITALIC);
    text("Te quiero, Celes. Para tu", 0, 270); pop();
  });

  drawing = true;
}

function draw() { if (drawing) myTurtle.update(); }

// Motor mejorado
p5.Turtle = function() {
  this.x = 0; this.y = 0; this.angle = 90;
  this._pc = "black"; this._fc = "white"; this._s = 5;
  this.q = []; this.path = []; this.f = false;

  this.go = (x, y) => this.add_queue(() => { this.x = x; this.y = y; if(this.f) this.path.push({x,y}); });
  this.seth = (a) => this.add_queue(() => { this.angle = a; });
  this.pencolor = (c) => this.add_queue(() => { this._pc = c; });
  this.fillcolor = (c) => this.add_queue(() => { this._fc = c; });
  this.begin_fill = () => this.add_queue(() => { this.path = [{x:this.x, y:this.y}]; this.f = true; });
  this.end_fill = () => this.add_queue(() => {
    this.f = false; push(); translate(width/2, height/2); scale(1,-1);
    fill(this._fc); stroke(this._pc); strokeWeight(4);
    beginShape(); for(let p of this.path) vertex(p.x, p.y); endShape(CLOSE); pop();
  });
  this.circle = (r, ext) => {
    let steps = floor(abs(ext)/4); let sA = ext/steps;
    for(let i=0; i<steps; i++) {
      this.add_queue(() => {
        let ox = this.x, oy = this.y;
        this.angle += sA;
        this.x += (2*r*sin(radians(sA/2))) * cos(radians(this.angle-90+sA/2));
        this.y += (2*r*sin(radians(sA/2))) * sin(radians(this.angle-90+sA/2));
        push(); translate(width/2, height/2); scale(1,-1);
        stroke(this._pc); strokeWeight(4); line(ox, oy, this.x, this.y); pop();
        if(this.f) this.path.push({x:this.x, y:this.y});
      });
    }
  };
  this.speed = (s) => this._s = s;
  this.add_queue = (f) => this.q.push(f);
  this.update = () => { for(let i=0; i<this._s && this.q.length>0; i++) this.q.shift()(); };
};
