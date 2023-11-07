const RAINBOW_DELAY = 1000;
let idInterval = null;

const refs = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
};

refs.btnStop.disabled = true;
refs.btnStart.addEventListener('click', onBtnStartRainbow);
refs.btnStop.addEventListener('click', onBtnStopRainbow);

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
} 

function onBtnStartRainbow() {
    refs.btnStart.disabled = true;
    refs.btnStop.disabled = false;

    idInterval = setInterval(() => {
        refs.body.style.backgroundColor = getRandomHexColor();
    }, RAINBOW_DELAY);
}

function onBtnStopRainbow() {
    refs.btnStart.disabled = false;
    refs.btnStop.disabled = true;

    clearInterval(idInterval);
    }