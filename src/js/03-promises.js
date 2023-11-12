import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', submitCreatePromise);

function submitCreatePromise(e) {
e.preventDefault();

e.target.elements.delay.valueAsNumber;

let delay = firstDelay.valueAsNumber;
const delayStepVal = delayStep.valueAsNumber;
const amountVal = amount.valueAsNumber;

for (let position = 1; position <= amountVal; position++) {
  createPromise(position, delay)
  .then(({ position, delay }) => {
    Notiflix.Notify.success (`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ i, delay }) => {
    Notiflix.Notify.failure (`❌ Rejected promise ${position} in ${delay}ms`);
  });
  delay += delayStepVal;
}
}