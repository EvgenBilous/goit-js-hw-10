const loadEl = document.querySelector('.loader');
const catCard = document.querySelector('.cat-info');
const selectEl = document.querySelector('.breed-select');

export function showCard() {
  catCard.classList.add('is-hidden');
}

export function showLoader() {
  loadEl.classList.remove('is-hidden');
}
export function hideCard() {
  catCard.classList.remove('is-hidden');
}

export function hideLoader() {
  loadEl.classList.add('is-hidden');
}

export function showSelect() {
  selectEl.classList.remove('is-hidden');
}
