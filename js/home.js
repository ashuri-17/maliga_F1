window.addEventListener('DOMContentLoaded', function () {
    const sfxSetting = localStorage.getItem("sfx");
    const bgmusic = document.getElementById("bgmusic");

    if (sfxSetting === "on") {
        if (localStorage.getItem("bgmusicPlaying") !== "true") {
            bgmusic.play().catch(() => {});
            localStorage.setItem("bgmusicPlaying", "true");
        }
    }
});

function start(){
    window.location.href = "play.html";
}

function set(){
    window.location.href = "settings.html";
}

function more(){
    window.location.href = "more.html";
}

function quit(){
    if (confirm("Are you sure you want to quit?")) {
        window.close();
    }
}
