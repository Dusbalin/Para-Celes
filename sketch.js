function setup() {
  createCanvas(600, 600);
  noLoop(); // Solo dibuja una vez
}

function draw() {
  background(255);
  // Mover el origen al centro (como en Turtle)
  translate(width / 2, height / 2);
  scale(1, -1); // Invertir el eje Y para que coincida con Turtle

  // --- Envoltura del Ramo ---
  stroke("Blue");
  strokeWeight(4);
  fill("LightBlue");
  
  beginShape();
  // Simulación de los movimientos de arco del código original
  vertex(40, -167);
  bezierVertex(20, -150, -20, -100, -37, -69);
  bezierVertex(-80, -20, -120, 50, -100, 120);
  bezierVertex(-50, 150, 50, 180, 100, 100);
  bezierVertex(150, 50, 120, -50, 40, -167);
  endShape(CLOSE);

  // --- Moño Rosa ---
  stroke("MediumVioletRed");
  fill("HotPink");
  push();
  translate(30, -80);
  ellipse(0, 0, 80, 40); // Lado izquierdo
  ellipse(40, 0, 80, 40); // Lado derecho
  fill("HotPink");
  circle(20, 0, 35); // Centro del moño
  pop();

  // --- Hojas ---
  dibujarHoja(-80, 110, 30);
  dibujarHoja(-100, 130, 60);
  dibujarHoja(-70, 140, -20);

  // --- Girasoles ---
  dibujarFlor(155, 115);
  dibujarFlor(60, 170);
  dibujarFlor(-45, 120);
  dibujarFlor(-11, 41);
  dibujarFlor(65, 85);

  // --- Mensaje ---
  scale(1, -1); // Voltear texto para que no salga al revés
  noStroke();
  fill("Gold");
  textAlign(CENTER);
  textSize(32);
  textStyle(BOLDITALIC);
  text("Te quiero, Celes. Para tu", 0, 250);
}

function dibujarHoja(x, y, angulo) {
  push();
  translate(x, y);
  rotate(radians(angulo));
  stroke("DarkGreen");
  fill("LimeGreen");
  beginShape();
  vertex(0, 0);
  bezierVertex(20, 20, 20, 40, 0, 60);
  bezierVertex(-20, 40, -20, 20, 0, 0);
  endShape(CLOSE);
  pop();
}

function dibujarFlor(x, y) {
  push();
  translate(x, y);
  
  // Pétalos
  stroke("Orange");
  fill("Yellow");
  for (let i = 0; i < 8; i++) {
    ellipse(0, 15, 15, 30);
    rotate(PI / 4);
  }
  
  // Centro
  noStroke();
  fill("SaddleBrown");
  circle(0, 0, 25);
  pop();
}

