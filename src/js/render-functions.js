import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryRef = document.querySelector('.gallery');

const gallery = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
  overlayOpacity: 0.8,
});

export function renderGallery(data) {
  galleryRef.innerHTML = data.map(getGalleryItemMarkup).join('');
  gallery.refresh();
}

function getGalleryItemMarkup({
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
}

const progressBarRef = document.querySelector('.progress-bar');

export function toggleProgressBar(show) {
  if (show) {
    progressBarRef.classList.add('progress-bar--show');
  } else {
    progressBarRef.classList.remove('progress-bar--show');
  }
}
