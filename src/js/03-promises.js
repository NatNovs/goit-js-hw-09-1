function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
}
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  position: 'center-center',
  timeout: 10000,
  clickToClose: true,
  CSSAnimationStyle: 'zoom',
};

document.body.style.backgroundColor = '#47717d';
const form = document.querySelector('form.form');

form.addEventListener('submit', onPromiseCreate);

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function onPromiseCreate(event) {
  event.preventDefault();
  let {
    elements: { delay, step, amount },
    } = event.currentTarget;
    let inputDelay = Number(delay.value);
    let inputStep = Number(step.value);
    let inputAmount = Number(amount.value);
}

if (inputDelay < 0 || inputStep < 0 || inputAmount <= 0) {
  Notify.warning(`❗❗❗❗ Insert positive number`);
  return;
}
for (let i = 1; i <= inputAmount; i +=1) {
  let position = i + 1;
  let delays = inputDelay + inputStep * i;
  createPromise(position, delays)
  .then(({ position, delay }) => {
    Notify.success(
      `✅ Fulfilled promise ${position} in ${delay}ms`,
      options
    );
  })
.catch(({ position, delay }) => {
  Notify.failure(
    `❌ Rejected promise ${position} in ${delay}ms`,
    options
  );
});
event.currentTarget.reset();
}
