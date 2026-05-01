// Go to menu
document.addEventListener('DOMContentLoaded', function() {
    const menu = document.getElementById("menu");
    if (menu) {
        menu.onclick = function () {
            window.location.href = "home.html";
        };
    }
});

function how(){
    window.location.href = "how.html";
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

// Restore toggle state on load
window.addEventListener('DOMContentLoaded', function() {
    const sfx = localStorage.getItem("sfx") || "off";
    updateToggle(sfx);
});
