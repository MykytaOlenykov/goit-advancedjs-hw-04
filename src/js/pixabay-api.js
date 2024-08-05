import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { renderGallery, toggleProgressBar } from './render-functions';

const notify = {
  error(message) {
    iziToast.error({
      position: 'topRight',
      message,
    });
  },
};

const { VITE_API_KEY } = import.meta.env;

class PixabayApi {
  #API_URL = 'https://pixabay.com/api/';
  #BASE_SEARCH_PARAMS = {
    key: VITE_API_KEY,
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  };

  fetchPhotos({
    searchValue = '',
    startCallback = null,
    finallyCallback = null,
  }) {
    this.#validateSearchValue(searchValue);

    const serachParams = new URLSearchParams({
      ...this.#BASE_SEARCH_PARAMS,
      q: searchValue,
    });

    startCallback?.();
    toggleProgressBar(true);

    fetch(`${this.#API_URL}?${serachParams}`, {
      method: 'GET',
    })
      .then(res => {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res.json();
      })
      .then(data => {
        if (!data.hits?.length) {
          notify.error(
            'Sorry, there are no images matching your search query. Please try again!'
          );
        }

        renderGallery(data.hits ?? []);
      })
      .catch(err => {
        notify.error(err?.message ?? 'Something went wrong');
      })
      .finally(() => {
        finallyCallback?.();
        toggleProgressBar(false);
      });
  }

  #validateSearchValue(searchValue) {
    if (searchValue.length > 100) {
      const message = 'Search value may not exceed 100 characters.';
      throw new Error(message);
    }
  }
}

export const pixabayApi = new PixabayApi();
