const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY =
  'live_oEvQ1sP1tGC3ckFuyx9hqr0pWeUXXp3OCENzWXqOKiZhL4nVFLGEN4a3JFZJxbmb';
const errorMessage = 'Oops! Something went wrong! Try reloading the page!';
const option = {
  headers: {
    'x-api-key': API_KEY,
  },
};
export function fetchBreeds() {
  return fetch(`${BASE_URL}/breeds`, option).then(res => {
    if (!res.ok) {
      throw new Error(errorMessage);
    }
    return res.json();
  });
}

export function fetchCatByBreed(breedId) {
  return fetch(`${BASE_URL}/images/search?breed_ids=${breedId}`, option).then(
    response => {
      if (!response.ok) {
        throw new Error(errorMessage);
      }
      return response.json();
    }
  );
}
