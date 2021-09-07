import country from '../templates/countries-json_all.hbs';
import countryName from '../templates/counties-name.hbs';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/core/dist/BrightTheme.css';
const debounce = require('lodash.debounce');
const inputNameCountries = document.querySelector('.countriesInput');
const outputParametiers = document.querySelector('.parametiersOutput');

const getCountries = inputText => {
  return fetch(`https://restcountries.eu/rest/v2/name/${inputText}`)
    .then(response => response.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log(error));
};

function selectAnswer() {
  const value = inputNameCountries.value;
  if (!value) {
    return;
  }
  getCountries(value).then(data => {
    const dataLength = data.length;
    if (dataLength === 1) {
      const markup = country(data);
      outputParametiers.innerHTML = markup;
    } else if (dataLength > 1 && dataLength < 10) {
      return (outputParametiers.innerHTML = countryName(data));
    } else {
      return error({
        text: 'To many matches found. Please enter a more specific query!',
      });
    }
  });
}
console.log(country);
inputNameCountries.addEventListener('input', debounce(selectAnswer, 500));
