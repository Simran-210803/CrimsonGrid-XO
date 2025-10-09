console.log("Welcome to Tic Tac Toe");

let music = new Audio("music.mp3");
let audioTurn = new Audio("ting.mp3");
let winSound = new Audio("win.mp3");        // ✅ For win
let drawSound = new Audio("gameover.mp3");  // ✅ Only for draw
let turn = "X";
let isGameOver = false;

// Start music after user clicks
document.body.addEventListener("click", () => {
    music.play();
}, { once: true });

// Change Turn
const changeTurn = () => {
    return turn === "X" ? "O" : "X";
};

// Check Win
const checkWin = () => {
    let boxTexts = document.getElementsByClassName("boxText");
    let wins = [
        [0, 1, 2, 0, 5, 0],
        [3, 4, 5, 0, 15, 0],
        [6, 7, 8, 0, 25, 0],
        [0, 3, 6, -10, 15, 90],
        [1, 4, 7, 0, 15, 90],
        [2, 5, 8, 10, 15, 90],
        [0, 4, 8, 0, 15, 45],
        [2, 4, 6, 0, 15, 135]
    ];

    wins.forEach((e) => {
        if (
            boxTexts[e[0]].innerText === boxTexts[e[1]].innerText &&
            boxTexts[e[1]].innerText === boxTexts[e[2]].innerText &&
            boxTexts[e[0]].innerText !== ""
        ) {
            const winner = boxTexts[e[0]].innerText;
            document.querySelector(".info").innerText = winner + " Won";
            isGameOver = true;

            winSound.play(); // ✅ Play win sound

            // 🎉 Show celebration image
            document.querySelector(".imgBox img").style.width = "200px";

            // 🟦 Draw winning line
            const line = document.querySelector(".line");
            line.style.width = "30vw";
            line.style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`;
        }
    });

    // ❌ Check for draw
    let allFilled = Array.from(boxTexts).every(e => e.innerText !== "");
    if (!isGameOver && allFilled) {
        document.querySelector(".info").innerText = "Game Over"; // ✅ Only show Game Over here
        drawSound.play(); // ✅ Only play this for draw
        isGameOver = true;
    }
};

// Game logic
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector(".boxText");

    element.addEventListener("click", () => {
        if (boxText.innerText === "" && !isGameOver) {
            boxText.innerText = turn;
            audioTurn.play();
            checkWin();

            if (!isGameOver) {
                turn = changeTurn();
                document.querySelector(".info").innerText = "Turn for " + turn;
            }
        }
    });
});

// Reset logic
document.getElementById("reset").addEventListener("click", () => {
    let boxTexts = document.querySelectorAll(".boxText");
    boxTexts.forEach((element) => {
        element.innerText = "";
    });

    turn = "X";
    isGameOver = false;

    document.querySelector(".info").innerText = "Turn for " + turn;
    document.querySelector(".imgBox img").style.width = "0"; // Hide GIF
    document.querySelector(".line").style.width = "0";        // Hide line
});

