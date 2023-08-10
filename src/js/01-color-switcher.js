const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
  body: document.querySelector('body'),
};

let timerId = null;
refs.stopBtn.setAttribute('disabled', true);

refs.startBtn.addEventListener('click', handlerStartChangeColor);

function handlerStartChangeColor() {
  timerId = setInterval(() => {
    let colorBcgr = getRandomHexColor();
    // console.log(colorBcgr);
    refs.body.style.backgroundColor = colorBcgr;
    refs.stopBtn.removeAttribute('disabled');
    refs.startBtn.setAttribute('disabled', true);
  }, 1000);
}

refs.stopBtn.addEventListener('click', handlerStopChangeColor);

function handlerStopChangeColor() {
  clearInterval(timerId);
  refs.startBtn.removeAttribute('disabled');
  refs.stopBtn.setAttribute('disabled', true);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
