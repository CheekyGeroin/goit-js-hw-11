import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchImages } from './fetchImages';

const refs = {
  searchBar: document.querySelector("[name='searchQuery']"),
  form: document.querySelector('.search-form'),
};

refs.form.addEventListener('submit', onSearchImages);

function onSearchImages(e) {
  e.preventDefault();

  const searchItem = refs.searchBar.value;

  fetchImages(searchItem)
    .then(createMarkup)
    .then(addMarkup)
    .catch(errorHandler);
}

function createMarkup(imagesArr) {
  return {
    markup: imagesArr.map(
      image => `<div class="photo-card">
  <img src="${image}" alt="" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>`
    ),
  };
}

function errorHandler(error) {
  if (error === 'not found') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
