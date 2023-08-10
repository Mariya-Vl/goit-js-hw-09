import Notiflix from 'notiflix';

const refs = {
  submitBtn: document.querySelector('button'),
  amountInput: document.querySelector('input[name="amount"]'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
};

let amount = 0;
let intervalId = null;
let position = 1;

refs.submitBtn.addEventListener('click', startPromise);

function startPromise(evt) {
  evt.preventDefault();
  amount = Number(refs.amountInput.value);
  console.log('Amount of promises: ', amount);
  let delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);
  console.log('Step = ', step);
  console.log('Delay = ', delay);
  

  if (position > amount) {
    clearTimeout(intervalId);
    return Notiflix.Notify.info(`All promises have used up!`);
  } else {
    intervalId = setTimeout(() => {
      createPromise(position, delay)
        .then(({ position, delay }) => {
          console.log('Position = ', position);
          console.log('Inside the interval');
          Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });         
    }, delay);
    
  }
  delay += step;
    position += 1;
    console.log('Delay inside the timeout', delay);
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
  return promise;
}
