import Notiflix from 'notiflix';

const refs = {
  submitBtn: document.querySelector('button'),
  amountInput: document.querySelector('input[name="amount"]'),
  delayInput: document.querySelector('input[name="delay"]'),
  stepInput: document.querySelector('input[name="step"]'),
};

let timeoutlId = null;

refs.submitBtn.addEventListener('click', startPromise);

function startPromise(evt) {
  evt.preventDefault();
  const amount = Number(refs.amountInput.value);
  let delay = Number(refs.delayInput.value);
  const step = Number(refs.stepInput.value);

  for (let position = 1; position <= amount; position += 1) {
    const delayAll = delay + step * (position - 1);
    // console.log(delayAll);
    createPromise(position, delayAll)
      .then(({ position, delay }) => {
        Notiflix.Notify.info(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
