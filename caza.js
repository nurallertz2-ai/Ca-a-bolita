let x = 200;
let y = 150;
let r = 30;
let score = 0;

let startTime = 0;
let gameOver = false;

let pausa = false;
let dificil = false;

function setup() {
    createCanvas(500, 300);
    moveCircle();
    startTime = millis(); // “reloj” de inicio

}

function draw() {
    if (pausa) {
        background(102, 90, 255);
        text("PAUSA (P para seguir)", 120,
            height / 2);
        return;
        text(dificil ? "Modo: DIFÍCIL (H)" : "Modo:NORMAL (H)", 10, 68);
    }
    background(102, 90, 255);
    let t = timeLeft();
    if (t === 0) gameOver = true;
    text("Tiempo: " + nf(t, 2), 10, 48);
    fill(255)
    textSize(18);
    text("Puntos: " + score, 10, 24);
    if (!gameOver) {
        circle(x, y, r * 2);
    }
    if (gameOver) {
        textSize(24);
        text("¡FIN! Puntos: " + score, 110, height / 2);
    }
    fill(126, 175, 252)
    circle(x, y, r * 2);
}

function moveCircle() {
    x = random(r, width - r);
    y = random(r, height - r);
}

function mousePressed() {
    if (gameOver) return;
    // Distancia del mouse al centro del círculo
    let d = dist(mouseX, mouseY, x, y);
    if (d < r) {
        moveCircle(); // si clicas dentro, reaparece en otro sitio
        r = max(10, r - 2);
        score = score + 1; // o score++;
    }
}

function timeLeft() {
    let total = dificil ? 20 : 30;
    let elapsed = int((millis() - startTime) / 1000);
    return max(0, total - elapsed);
}

function keyPressed() {
    if (key === 'R' || key === 'r') {
        score = 0;
        gameOver = false;
        startTime = millis();
        moveCircle();
        r = 30; // restaurar tamaño inicial
    }
    if (key === 'P' || key === 'p') pausa = !pausa;
    if (key === 'D' || key === 'd') {
        dificil = !dificil;
        startTime = millis(); // reinicia el cronómetro al cambiar modo
    }
}