import axios from 'axios';

export const pixabayApi = axios.create({
  baseURL: 'https://pixabay.com/api/',
  params: {
    key: '33901204-9e2cee760dcc4c2bf1fca35a0',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 20,
  },
  headers: {
    'Content-Type': 'application/json',
  },
});

export async function getPhotos({ searchValue = '', page = 1, signal }) {
  validateSearchValue(searchValue);

  const { data } = await pixabayApi.get('', {
    params: {
      q: searchValue,
      page,
    },
    signal,
  });

  return data;
}

function validateSearchValue(searchValue) {
  if (searchValue.length > 100) {
    const message = 'Search value may not exceed 100 characters.';
    throw new Error(message);
  }
}
