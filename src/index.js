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
  console.log(imagesArr);
  Notify.info(`Hooray! We found ${imagesArr.data.totalHits} images.`);
  for (let i = 0; i < imagesArr.length; i += 1) {
    return `<a class='big__image' href='${i.largeImageURL}'>
    <div class="photo-card">
      <img src="${i.pageURL}" alt="${i.tags}" loading="lazy" />
      <div class="info">
    <p class="info-item">
      <b>Likes ${i.likes}</b>
    </p>
    <p class="info-item">
      <b>Views ${i.views}</b>
    </p>
    <p class="info-item">
      <b>Comments ${i.comments}</b>
    </p>
    <p class="info-item">
      <b>Downloads ${i.downloads}</b>
    </p>
  </div>;
</div>;
</a>`;
  }
}

function errorHandler(error) {
  if (error === 'not found') {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
  }
}
<div class="photo-card">
  <img src="" alt="" loading="lazy" />
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
</div>;
