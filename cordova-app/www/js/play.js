// Difficulty selection
function selectDifficulty(option) {
    document.querySelectorAll(".e, .m, .h, .x").forEach(o => o.classList.remove("active"));
    option.classList.add("active");

    const difficulty = option.textContent.toLowerCase();
    localStorage.setItem("difficulty", difficulty);
}

function startGame() {
    const difficulty = localStorage.getItem("difficulty") || "easy";
    localStorage.setItem("difficulty", difficulty);
    window.location.href = "start.html";
}

// SFX toggle functionality
function toggleSFX(state) {
    const music = document.getElementById("bgmusic");
    localStorage.setItem("sfx", state);
    updateToggle(state);

    if (state === "on") {
        const playPromise = music.play();
        if (playPromise !== undefined) {
            playPromise.catch(() => {
                const enableOnClick = function() {
                    music.play();
                    document.removeEventListener('click', enableOnClick);
                };
                document.addEventListener('click', enableOnClick, { once: true });
            });
        }
        sessionStorage.setItem('musicPlaying', 'true');
    } else {
        music.pause();
        sessionStorage.setItem('musicPlaying', 'false');
    }
}

function updateToggle(state) {
    const on = document.getElementById("on");
    const off = document.getElementById("off");
    if (state === "on") {
        on.classList.add("active");
        off.classList.remove("active");
    } else {
        off.classList.add("active");
        on.classList.remove("active");
    }
}

// Restore toggle state and difficulty selection on load
window.addEventListener('DOMContentLoaded', function() {
    const sfx = localStorage.getItem("sfx") || "off";
    updateToggle(sfx);

    const difficulty = localStorage.getItem("difficulty") || "easy";
    const firstChar = difficulty.charAt(0);
    const elem = document.querySelector(`.${firstChar}`);
    if (elem) elem.classList.add("active");
});
