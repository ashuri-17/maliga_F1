// Difficulty-based word lists
const wordLists = {
    easy: [
        { word: "NOVEMBER", hint: "It is a month where we celebrate for dead." },
        { word: "PUMPKIN", hint: "Orange and round, a Halloween icon." },
        { word: "GHOST", hint: "Invisible and spooky!" },
        { word: "WITCH", hint: "Flies on a broomstick." },
        { word: "BAT", hint: "Nocturnal flying mammal associated with vampires." }
    ],
    medium: [
        { word: "VAMPIRE", hint: "Fangs, cape, and thirst for blood." },
        { word: "COFFIN", hint: "Where the dead are laid to rest." },
        { word: "WEREWOLF", hint: "Transforms under full moon." },
        { word: "ZOMBIE", hint: "Undead creature that craves brains." },
        { word: "MUMMY", hint: "Ancient wrapped corpse that walks." }
    ],
    hard: [
        { word: "APOCALYPSE", hint: "End of the world scenario." },
        { word: "EXORCISM", hint: "Banishing evil spirits ritual." },
        { word: "NECROMANCER", hint: "Raises the dead through magic." },
        { word: "POLTERGEIST", hint: "Noisy ghost that moves objects." },
        { word: "DOPPELGANGER", hint: "Ghostly double of a living person." }
    ],
    extreme: [
        { word: "EXORCIST", hint: "Someone who drives out evil spirits" },
        { word: "MUTILATE", hint: "To severely damage or disfigure" },
        { word: "CURSE", hint: "Supernatural affliction" },
        { word: "GRAVEYARD", hint: "Where dead bodies are buried" },
        { word: "HAUNTED", hint: "Inhabited by ghosts" }
    ]
};

// Game state variables
let currentDifficulty = localStorage.getItem("difficulty") || "easy";
let words = [...wordLists[currentDifficulty]];
let currentWordIndex = 0;
let selected = words[currentWordIndex];
let word = selected.word;
let guessedLetters = Array(word.length).fill("_");
let lives;
let wrongLetters = [];
let totalWords = words.length;
let wordsCompleted = 0;

// Scoring variables
let score = 0;
let totalScore = 0;
const basePoints = {
    easy: 100,
    medium: 200,
    hard: 300,
    extreme: 500
};

// Initialize word display boxes immediately
function initializeWordBoxes() {
    const wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.innerHTML = "";
    for (let i = 0; i < word.length; i++) {
        const box = document.createElement("div");
        box.classList.add("letter-box");
        box.textContent = guessedLetters[i];
        wordDisplay.appendChild(box);
    }
}

// Enhanced Alert System
function showAlert(message, callback) {
    const alert = document.getElementById('customAlert');
    const overlay = document.getElementById('alertOverlay');
    const alertMessage = document.getElementById('alertMessage');

    alertMessage.textContent = message;
    alert.style.display = 'block';
    overlay.style.display = 'block';

    const alertButton = alert.querySelector('button');
    alertButton.onclick = function() {
        hideAlert();
        if (callback) callback();
    };
}

function hideAlert() {
    document.getElementById('customAlert').style.display = 'none';
    document.getElementById('alertOverlay').style.display = 'none';
}

// Initialize lives based on difficulty
function initializeLives() {
    switch(currentDifficulty) {
        case "easy": lives = 8; break;
        case "medium": lives = 6; break;
        case "hard": lives = 3; break;
        case "extreme": lives = 1; break;
        default: lives = 8;
    }
}

// Update score display
function updateScoreDisplay() {
    document.getElementById("score").textContent = `Score: ${totalScore}`;
}

// Initialize game
function initializeGame() {
    initializeLives();
    initializeWordBoxes();
    score = 0;
    updateGameDisplay();
    updateScoreDisplay();
}

// Update game displays
function updateGameDisplay() {
    document.querySelector(".level").textContent =
        `${currentDifficulty.charAt(0).toUpperCase() + currentDifficulty.slice(1)} Level`;
    document.getElementById("hintText").innerHTML = `<strong>Hint:</strong> ${selected.hint}`;
    document.getElementById("lives").textContent = lives;
    document.getElementById("progress").textContent = `Word ${currentWordIndex + 1} of ${totalWords}`;
    updateWordDisplay();
}

function updateWordDisplay() {
    const wordDisplay = document.getElementById("wordDisplay");
    const boxes = wordDisplay.querySelectorAll(".letter-box");

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].textContent = guessedLetters[i];
    }

    document.getElementById("wrongLetters").textContent = wrongLetters.join(", ");
}

// Handle word completion
function loadNextWord() {
    currentWordIndex++;
    wordsCompleted++;

    if (currentWordIndex < words.length) {
        selected = words[currentWordIndex];
        word = selected.word;
        guessedLetters = Array(word.length).fill("_");
        wrongLetters = [];
        score = 0;
        initializeWordBoxes();
        updateGameDisplay();
        updateScoreDisplay();
    } else {
        if (lives > 0) {
            showAlert(`Congratulations!\nFinal Score: ${totalScore}`, () => {
                resetGame();
            });
        } else {
            showAlert(`Game Over!\nFinal Score: ${totalScore}`, () => {
                window.location.href = "gameover.html";
            });
        }
    }
}

// Reset game state
function resetGame() {
    currentWordIndex = 0;
    wordsCompleted = 0;
    words = [...wordLists[currentDifficulty]];
    selected = words[currentWordIndex];
    word = selected.word;
    guessedLetters = Array(word.length).fill("_");
    wrongLetters = [];
    score = 0;
    totalScore = 0;
    initializeLives();
    initializeWordBoxes();
    updateGameDisplay();
    updateScoreDisplay();
}

// Handle letter submission
function submitGuess() {
    const input = document.getElementById("guessInput");
    const guess = input.value.toUpperCase();
    input.value = "";
    input.focus();

    if (!guess.match(/[A-Z]/) || guess.length !== 1) {
        showAlert("Please enter a valid letter.");
        return;
    }

    if (guessedLetters.includes(guess) || wrongLetters.includes(guess)) {
        showAlert("You've already guessed that letter!");
        return;
    }

    let correctGuess = false;
    if (word.includes(guess)) {
        correctGuess = true;
        const lettersInWord = word.split(guess).length - 1;
        const pointsEarned = 10 * lettersInWord;
        totalScore += pointsEarned;

        for (let i = 0; i < word.length; i++) {
            if (word[i] === guess) guessedLetters[i] = guess;
        }

        updateScoreDisplay();
        showPointsAnimation(pointsEarned);
    } else {
        wrongLetters.push(guess);
        lives--;
        totalScore = Math.max(0, totalScore - 5);
        updateScoreDisplay();
    }

    updateWordDisplay();
    document.getElementById("lives").textContent = lives;

    if (guessedLetters.join("") === word) {
        const livesBonus = lives;
        const difficultyBonus = basePoints[currentDifficulty];
        totalScore += livesBonus + difficultyBonus;

        updateScoreDisplay();

        setTimeout(() => {
            showAlert(`Correct!\nBonus: +${difficultyBonus} + ${livesBonus} for lives!`, () => {
                loadNextWord();
            });
        }, 500);
    } else if (lives <= 0) {
        setTimeout(() => {
            showAlert(`The word was "${word}".\nFinal Score: ${totalScore}`, () => {
                window.location.href = "gameover.html";
            });
        }, 500);
    }
}

// Show points animation
function showPointsAnimation(points) {
    const animation = document.createElement("div");
    animation.className = "points-animation";
    animation.textContent = `+${points}`;
    animation.style.position = "absolute";
    animation.style.color = "#8A0303";
    animation.style.fontWeight = "bold";
    animation.style.animation = "floatUp 1s forwards";

    const wordDisplay = document.getElementById("wordDisplay");
    wordDisplay.appendChild(animation);

    setTimeout(() => {
        animation.remove();
    }, 1000);
}

// Navigation functions
function home() {
    window.location.href = "home.html";
}

function set() {
    window.location.href = "play.html";
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeGame();

    document.getElementById("guessInput").addEventListener("keypress", function(e) {
        if (e.key === "Enter") {
            submitGuess();
        }
    });
});
