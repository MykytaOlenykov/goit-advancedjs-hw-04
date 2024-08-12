import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getPhotos } from './js/pixabay-api';
import { galleryRef, gallery, progressElement } from './js/render-functions';
import { isAxiosError } from 'axios';

const notify = {
  success(message) {
    iziToast.success({
      position: 'topRight',
      message,
    });
  },
  error(message) {
    iziToast.error({
      position: 'topRight',
      message,
    });
  },
};

const sentinelRef = document.querySelector('.sentinel');
const formRef = document.querySelector('.search-form');
const buttonElement = {
  ref: formRef.querySelector('.button'),
  disabled: false,
  disable() {
    this.disabled = true;
    this.ref.setAttribute('disabled', '');
  },
  enable() {
    this.disabled = false;
    this.ref.removeAttribute('disabled');
  },
};

formRef.addEventListener('submit', handleSearchPhotos);

let searchValue = '';

async function handleSearchPhotos(e) {
  e.preventDefault();
  if (buttonElement.disabled) return;

  try {
    buttonElement.disable();
    disconnectIntersectionObserver();
    gallery.clear();
    progressElement.show();

    searchValue = e.target.elements['search-value']?.value ?? '';

    const data = await getPhotos({
      searchValue: searchValue.trim(),
    });

    if (!data.hits?.length) {
      notify.error(
        'Sorry, there are no images matching your search query. Please try again!'
      );
    }

    gallery.addPhotos(data.hits ?? []);
    registerIntersectionObserver();
  } catch (error) {
    notify.error(err?.message ?? 'Something went wrong');
  } finally {
    buttonElement.enable();
    progressElement.hide();
  }
}

let abortController = null;
let observer = null;
let page = 1;

function registerIntersectionObserver() {
  abortController = new AbortController();
  const options = {
    rootMargin: '800px',
  };

  const onEntry = entries => {
    entries.forEach(async entry => {
      if (entry.isIntersecting) {
        progressElement.show();
        page += 1;

        try {
          const data = await getPhotos({
            page,
            searchValue,
            signal: abortController.signal,
          });
          gallery.addPhotos(data.hits);
          checkCollectionEnd(data.totalHits);
        } catch (error) {
          if (isAxiosError(error) && error.code === 'ERR_CANCELED') {
            return;
          }
          notify.error(error.message);
        }

        progressElement.hide();
      }
    });
  };

  observer = new IntersectionObserver(onEntry, options);
  observer.observe(sentinelRef);
}

function disconnectIntersectionObserver() {
  page = 1;
  if (abortController) {
    abortController.abort();
  }
  if (observer) {
    observer.disconnect();
  }
}

function checkCollectionEnd(totalHits) {
  if (totalHits <= galleryRef.children.length) {
    notify.success(
      "We're sorry, but you've reached the end of search results."
    );

    disconnectIntersectionObserver();
  }
}
