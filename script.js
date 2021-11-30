'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

const getCountryData = async function (country) {
  try {
    const resCountry = await fetch(
      `https://restcountries.com/v2/name/${country}`
    );
    const data = await resCountry.json();
    renderCountry(data[0]);

    const neighbour = data[0].borders[0];

    if (!neighbour) return 'No neighbour found';

    const resNeighbour = await fetch(
      `https://restcountries.com/v2/alpha/${neighbour}`
    );
    renderCountry(await resNeighbour.json(), 'neighbour');

    return `Successfully fetched data of ${country}`;
  } catch (error) {
    console.log('ERROR');
  }
};

getCountryData('nepal').then((res) => console.log(res));
