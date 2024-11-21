const colors = ["red", "green", "blue", "yellow", "pink", "purple", "orange", "brown"];

let started = true;
let time = 0;
let countdown;
let score = 0;
let lastTime = 0;


const colorCss = document.getElementById("color__card-text");
const meaningCss = document.getElementById("meaning__card-text");
const startButton = document.getElementById("startBtn");
const stopButton = document.getElementById("stopBtn");
const scoreText = document.getElementById("score");
const arrowsNo = document.querySelector(".arrows-no");
const arrowsYes = document.querySelector(".arrows-yes");
const timer = document.getElementById("timer");
const overlay = document.querySelector(".overlay__menu");
const scoreDiv = createScoreDiv();

window.addEventListener("keydown", keyboardListener);
startButton.addEventListener("click", startGame);
stopButton.addEventListener("click", stopGame);

arrowsNo.addEventListener("click", () => handleMatch(false, arrowsNo));
arrowsYes.addEventListener("click", () => handleMatch(true, arrowsYes));

function keyboardListener(event) {
    if (event.key === "ArrowLeft") {
        handleMatch(false, arrowsNo);
    } else if (event.key === "ArrowRight") {
        handleMatch(true, arrowsYes);
    }
}

function startGame() {
    started = true;
    overlay.style.display = "none";
    if (!overlay.contains(scoreDiv)) {
        overlay.appendChild(scoreDiv);
    }
    resetGame();
    startRoundTimer();
}

function stopGame() {
    started = false;
    displayGameOver();
    resetGame();
}

function handleMatch(isMatch, button) {
    checkMatch(isMatch);
    highlightButton(button);
}

function checkMatch(isMatch) {
    const color = colorCss.style.color;
    const text = colorCss.textContent;
    const matched = compColor(color, text);

    if (matched === isMatch) {
        score++;
        console.log("Correct! Score: " + score);
    } else {
        console.log("Wrong! Score: " + score);
    }
    startGame();
    scoreText.textContent = score;
}

function compColor(color, text) {
    return color === text;
}

function highlightButton(button) {
    button.classList.add("highlight");
    setTimeout(() => button.classList.remove("highlight"), 100);
}

function generateColor() {
    const color = getRandomColor();
    const text = getRandomColor();
    const fake = getRandomColor();
    return { color, text, fake };
}

function getRandomColor() {
    return colors[Math.floor(Math.random() * colors.length)];
}

function startRoundTimer() {
    cancelAnimationFrame(countdown);
    lastTime = performance.now();
    countdown = requestAnimationFrame(updateTimer);
}

function updateTimer(currentTime) {
    const deltaTime = currentTime - lastTime;
    if (deltaTime >= 1000) {
        time--;
        timer.textContent = time;
        lastTime = currentTime;
    }
    if (time > 0) {
        countdown = requestAnimationFrame(updateTimer);
    } else {
        displayGameOver();
    }
}

function createScoreDiv() {
    const div = document.createElement("div");
    div.classList.add("score__text");
    return div;
}

function resetGame() {
    const { color, text, fake } = generateColor();
    colorCss.textContent = text;
    colorCss.style.color = color;
    meaningCss.textContent = fake;
    clearInterval(countdown);
    time = 10;
    scoreText.textContent = score;
}

function displayGameOver() {
    console.log("Game Over! Score: " + score);
    scoreDiv.textContent = "Your score is: " + score;
    score = 0;
    decrement = 1000;
    overlay.style.display = "flex";
    styleScoreDiv();
    timer.textContent = 0;
    overlay.appendChild(scoreDiv);
}

function styleScoreDiv() {
    scoreDiv.style.color = "white";
    scoreDiv.style.fontSize = "2rem";
    scoreDiv.style.fontWeight = "bold";
    scoreDiv.style.textAlign = "center";
    scoreDiv.style.marginTop = "2rem";
    scoreDiv.style.width = "100%";
    scoreDiv.style.backgroundColor = "black";
    scoreDiv.style.padding = "1rem";
    scoreDiv.style.borderRadius = "10px";
    scoreDiv.style.boxShadow = "0 0 10px 0 black";
}