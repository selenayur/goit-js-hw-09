import { Notify } from 'notiflix/build/notiflix-notify-aio';

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

const promiseForm = document.querySelector('.form');
const delayEL = document.querySelector('[name=delay]');
const stepEL = document.querySelector('[name=step]');
const amountEL = document.querySelector('[name=amount]');

promiseForm.addEventListener('submit', onBtnClick);

function onBtnClick(event) {
  event.preventDefault();

  let delay = Number(delayEL.value);
  let step = Number(stepEL.value);
  let amount = Number(amountEL.value);

  for (let i = 1; i <= amount; i += 1) {
  
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delay += step;
  }
}
