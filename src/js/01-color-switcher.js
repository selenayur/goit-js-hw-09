function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
let colorSwitcher = null;

startBtn.addEventListener('click', onStartBtn);
stopBtn.addEventListener('click', onStopClick);

function onStartBtn() {
    colorSwitcher = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
    startBtn.disabled = true;
    stopBtn.disabled = false;
    }, 1000);
}

function onStopClick() {
    clearInterval(colorSwitcher);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}
