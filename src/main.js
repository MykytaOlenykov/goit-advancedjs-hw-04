import { pixabayApi } from './js/pixabay-api';

const formRef = document.querySelector('.search-form');
const buttonRef = formRef.querySelector('.button');

formRef.addEventListener('submit', handleSearchPhotos);

let disabledButton = false;

function handleSearchPhotos(e) {
  e.preventDefault();
  if (disabledButton) return;

  const searchValue = e.target.elements['search-value']?.value ?? '';

  pixabayApi.fetchPhotos({
    searchValue: searchValue.trim(),
    startCallback: () => {
      disabledButton = true;
      buttonRef.setAttribute('disabled', '');
    },
    finallyCallback: () => {
      disabledButton = false;
      buttonRef.removeAttribute('disabled');
    },
  });
}
