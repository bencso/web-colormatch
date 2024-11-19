const colors = [
    "red",
    "green",
    "blue",
    "yellow",
    "pink",
    "purple",
    "orange",
    "brown",
];

let started = true;
let time = 0;
let score = 0;
const colorCss = document.getElementById("color__card-text");
const meaningCss = document.getElementById("meaning__card-text");
const startButton = document.getElementById("startBtn");

window.addEventListener("keydown", keyboardListener);
startGame();

function keyboardListener(event) {
    if(event.key === "ArrowLeft") {
        console.log("Left");
    }
    if(event.key === "ArrowRight") {
        console.log("Right");
    }
}

function startGame() {
    const { color, text, fake } = generateColor();
    colorCss.textContent = text;
    colorCss.style.color = color;
    meaningCss.textContent = fake;
    let matched = compColor(color, text);
    console.table({ color, text, matched });
}

function compColor(color, text) {
    if(color === text) {
        return true;
    } else {
        return false;
    }
}

//TODO: Define tresholds
function generateColor() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    const text = colors[Math.floor(Math.random() * colors.length)];
    const fake = colors[Math.floor(Math.random() * colors.length)];
    return { color, text ,fake };
}