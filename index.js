let image = document.querySelector("img")
let audio = new Audio("Let-it-snow.mp3")
let isPlaying = false
let playTime = 0

let AnimationLength = 10000

function fadeAudioIn(audio, duration = 2000, interval = 100) {
    audio.volume = 0
    audio.play()
    let step = 1 / (duration / interval); // Step size based on duration and interval

    let fadeIn = setInterval(() => {
        if (audio.volume < 1) {
            audio.volume = Math.min(1, audio.volume + step); // Gradually increase volume
        } else {
            clearInterval(fadeIn); // Stop fading once max volume is reached
        }
    }, interval)
}

function fadeAudioOut(audio, duration = 2000, interval = 100) {
    let step = 1 / (duration / interval); // Step size based on duration and interval

    let fadeOut = setInterval(() => {
        if (audio.volume > 0) {
            audio.volume = Math.max(0, audio.volume - step); // Gradually decrease volume
        } else {
            audio.pause() 
            clearInterval(fadeOut) 
        }
    }, interval)
}

image.onclick = function() {
    if (!isPlaying) {
        audio.currentTime = playTime;
        fadeAudioIn(audio, 1000);
        isPlaying = true;

        setTimeout(() => {
            fadeAudioOut(audio, 1000);
            playTime = audio.currentTime;
            isPlaying = false;
        }, AnimationLength);
    }

    for (let i = 0; i < 500; i++) {
        setTimeout(() => {
            let snow = document.createElement("img");
            snow.src = "img/snowing.svg";
            snow.style.position = "absolute";
            snow.style.left = Math.floor(Math.random() * 100) + "%";

            let snowWidth = Math.floor(Math.random() * 80);
            if (snowWidth > 15) {
                snow.style.width = snowWidth + "px";
            }

            if (Math.random() * 10 > 5) {
                snow.style.animation = `Snowing ease ${AnimationLength}ms`;
            } else {
                snow.style.animation = `Snowing2 ease ${AnimationLength}ms`;
            }

            document.body.appendChild(snow);

            setTimeout(() => {
                snow.remove();
            }, AnimationLength);
        }, Math.random() * 4000);
    }
}