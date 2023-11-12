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


function bgColorChanger(){
    body.style.backgroundColor = getRandomHexColor();
    if(btnStart.getAttribute("disabled")){
        setTimeoutHandler = setTimeout(() => {
            bgColorChanger()
        },RAINBOW_DELAY)
    }
}

btnStart.addEventListener("click", (ev) => {
    if(!ev.target.getAttribute("disabled")){
        ev.target.setAttribute("disabled","disabled")
    }
    btnStop.removeAttribute("disabled")
    bgColorChanger()
})

btnStop.addEventListener("click", (ev) => {
    if(!btnStart.getAttribute("disabled")){
        return 
    }
    if(!ev.target.getAttribute("disabled")){
        ev.target.setAttribute("disabled","disabled")
    }
    btnStart.removeAttribute("disabled")
    if(setTimeoutHandler){
        clearTimeout(setTimeoutHandler)
    }
    setTimeoutHandler = 0
})