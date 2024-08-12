import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const galleryRef = document.getElementById('gallery');

const gallerySimpleLightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

export const gallery = {
  addPhotos(data) {
    const markup = data.map(this.generatePhotoMarkup).join('');
    galleryRef.insertAdjacentHTML('beforeend', markup);
    gallerySimpleLightbox.refresh();
  },
  clear() {
    galleryRef.innerHTML = '';
  },
  generatePhotoMarkup({
    largeImageURL,
    tags,
    webformatURL,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `
        <li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}">
                <img
                  class="gallery-image"
                  loading="lazy"
                  src="${webformatURL}"
                  alt="${tags}"
                />
                <span class="gallery-info-bar">
                    <span class="gallery-info">
                        <span class="gallery-info-label">Likes</span>
                        <span class="gallery-info-value">${likes}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Views</span>
                        <span class="gallery-info-value">${views}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Comments</span>
                        <span class="gallery-info-value">${comments}</span>
                    </span>
                    <span class="gallery-info">
                        <span class="gallery-info-label">Downloads</span>
                        <span class="gallery-info-value">${downloads}</span>
                    </span>
                </span>
            </a>
        </li>
    `;
  },
};

export const progressElement = {
  ref: document.querySelector('.progress-bar'),
  hide() {
    this.ref.classList.remove('progress-bar--show');
  },
  show() {
    this.ref.classList.add('progress-bar--show');
  },
};
