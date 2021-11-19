import './sass/main.scss';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '14763371-8ad954d112ffa98330dee37e7';

console.dir(window.scrollBy);

// key - твой уникальный ключ доступа к API.
// q - термин для поиска. То, что будет вводить пользователь.
// image_type - тип изображения. Мы хотим только фотографии, поэтому задай значение photo.
// orientation - ориентация фотографии. Задай значение horizontal.
// safesearch - фильтр по возрасту. Задай значение true.

const queryParams = `image_type=all&orientation=horizontal&safesearch=false`;
let page = 1;
const perPage = 40;

const galleryRef = document.querySelector('.gallery');
const formRef = document.querySelector('.search-form');
const loadMoreBut = document.querySelector('.load-more');

let query = null;

formRef.addEventListener('submit', onSubmit);
loadMoreBut.addEventListener('click', onLoadMoreClick);

function onSubmit(e) {
  e.preventDefault();
  loadMoreBut.setAttribute('hidden', 'true');
  page = 1;
  galleryRef.innerHTML = '';
  query = formRef.elements.searchQuery.value.trim();
  formRef.elements.searchQuery.value = query;

  if (query === '') {
    alert('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  fetchImages().then(images => {
    // console.dir(images);
    renderMarkup(images);
    page += 1;

    if (images.hits.length === 0) {
      alert('Sorry, there are no images matching your search query. Please try again.');
      loadMoreBut.setAttribute('hidden', 'true');
      return;
    }

    alert(`Hooray! We found ${images.totalHits} images.`);

    if (page > Math.ceil(images.totalHits / perPage)) {
      loadMoreBut.setAttribute('hidden', 'true');
      console.log(`We're sorry, but you've reached the end of search results.`);
    } else {
      loadMoreBut.removeAttribute('hidden');
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 10,
      behavior: 'smooth',
    });
  });
}

function fetchImages() {
  return fetch(
    `${BASE_URL}?key=${API_KEY}&q=${query}&${queryParams}&page=${page}&per_page=${perPage}`,
  ).then(response => {
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
            <img src="${webformatURL}" width="305" height="205" alt="" loading="lazy" />
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
  galleryRef.insertAdjacentHTML('beforeend', markup);
}

function onLoadMoreClick() {
  fetchImages().then(images => {
    renderMarkup(images);
    page += 1;

    if (page > Math.ceil(images.totalHits / perPage)) {
      loadMoreBut.setAttribute('hidden', 'true');
      console.log(`We're sorry, but you've reached the end of search results.`);
    }

    const { height: cardHeight } = document
      .querySelector('.gallery')
      .firstElementChild.getBoundingClientRect();

    window.scrollBy({
      top: cardHeight * 11,
      behavior: 'smooth',
    });
  });
}
