// Shared audio handler for all pages
(function() {
    const music = document.getElementById('bgmusic');
    if (!music) return;

    const sfxState = localStorage.getItem('sfx') || 'off';
    const savedTime = parseFloat(sessionStorage.getItem('musicTime')) || 0;
    const wasPlaying = sessionStorage.getItem('musicPlaying') === 'true';

    music.currentTime = savedTime;
    music.volume = 0.5;

    function tryPlay() {
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
    }

    if (sfxState === 'on' && wasPlaying) {
        tryPlay();
    }

    window.addEventListener('beforeunload', function() {
        sessionStorage.setItem('musicTime', music.currentTime);
        sessionStorage.setItem('musicPlaying', !music.paused);
    });
})();
