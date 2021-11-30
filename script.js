'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then((response) => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);
    return response.json();
  });
};

// Other Promise Combinators: race, allSettled and any
// Promise.race
(async function () {
  const res = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(res[0]);
})();
const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};
Promise.race([
  getJSON(`https://restcountries.com/v2/name/tanzania`),
  timeout(5),
])
  .then((res) => console.log(res[0]))
  .catch((err) => console.error(err));
// Promise.allSettled
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then((res) => console.log(res));
Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
// Promise.any [ES2021]
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then((res) => console.log(res))
  .catch((err) => console.error(err));
