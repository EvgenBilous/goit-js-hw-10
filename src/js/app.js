import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import Notiflix from 'notiflix';
import { fetchBreeds, fetchCatByBreed } from './cat-api';
import {
  showCard,
  showLoader,
  showSelect,
  hideCard,
  hideLoader,
} from './functions';

const selectEl = document.querySelector('.breed-select');
const catCard = document.querySelector('.cat-info');

selectEl.addEventListener('change', handleChangeSelect);

let isFirstLoad = true;

const select = new SlimSelect({
  select: '#selectElement',
});
fetchBreeds()
  .then(res => {
    const options = res.map(({ id, name }) => ({
      text: name,
      value: id,
    }));

    // const options = res
    //   .map(({ id, name }) => {
    //     return `<option value="${id}">${name}</option>`;
    //   })
    //   .join('');
    select.setData(options);

    //selectEl.insertAdjacentHTML('afterbegin', options);
    showSelect();
  })
  .catch(err => {
    Notiflix.Notify.failure(err.message);
  })
  .finally(() => {
    hideLoader();
  });

function handleChangeSelect(event) {
  if (isFirstLoad) {
    return (isFirstLoad = false);
  }

  const breedsId = event.target.value;
  showLoader();
  showCard();

  fetchCatByBreed(breedsId)
    .then(res => {
      renderCat(res);
      hideCard();
    })
    .catch(err => {
      Notiflix.Notify.failure(err.message);
    })
    .finally(() => {
      hideLoader();
    });
}

function renderCat(breeds) {
  const image = breeds[0].url;
  const { name, temperament, description } = breeds[0].breeds[0];
  const markup = `
  <img src="${image}" alt="${name}" width="500" height="400" />
    <div>
      <h2>${name}</h2>
      <p>
        ${description}
      </p>
      <p> <span class="temperament">Temperament:</span> ${temperament}</p>
  </div>
  `;

  catCard.innerHTML = markup;
}
