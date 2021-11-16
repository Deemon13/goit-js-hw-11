import './sass/main.scss';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '14763371-8ad954d112ffa98330dee37e7';

const queryParams = `image_type=all&orientation=horizontal&safesearch=false`;

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.search-form');

let query = null;

// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.

formRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  query = formRef.elements.searchQuery.value;
  console.log(query);
  fetchImages().then(renderMarkup);
}

function fetchImages() {
  return fetch(`${BASE_URL}?key=${API_KEY}&q=${query}&${queryParams}`).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}

function renderMarkup(images) {
  const markup = images.hits
    .map(({ webformatURL, likes, views, comments, downloads }) => {
      return `
        <div class="photo-card">
            <img src="${webformatURL}" alt="" loading="lazy" />
            <div class="info">
              <p class="info-item">
                <b>Likes</b>
                ${likes}
              </p>
              <p class="info-item">
                <b>Views</b>
                ${views}
              </p>
              <p class="info-item">
                <b>Comments</b>
                ${comments}
              </p>
              <p class="info-item">
                <b>Downloads</b>
                ${downloads}
              </p>
            </div>
        </div>
        `;
    })
    .join('');
  galleryRef.innerHTML = markup;
}
