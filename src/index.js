import './css/styles.css';
import { fetchImages } from './fetchImages';
import Notiflix, { Notify } from 'notiflix';
import axios from 'axios';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const refs = {
  input: document.querySelector('input'),
  form: document.querySelector('.search-form'),
  buttonLoad: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
  alert: document.querySelector('.alert'),
};

refs.form.addEventListener('submit', onSearchSubmit);
refs.buttonLoad.addEventListener('click', onLoadMore);
refs.buttonLoad.classList.add('is-hidden');

let currentPage = 1;
let searchItem = '';
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function onSearchSubmit(e) {
  e.preventDefault();

  refs.buttonLoad.classList.add('is-hidden');

  searchItem = e.currentTarget.elements.searchQuery.value.trim();

  if (searchItem === 0) {
    return;
  } else {
    clearResult();
    currentPage = 1;
    fetchSearch(searchItem, currentPage);
  }
}

function clearResult() {
  refs.gallery.innerHTML = '';
}

function onLoadMore() {
  refs.buttonLoad.classList.add('is-hidden');
  currentPage += 1;
  searchItem = refs.input.value.trim();
  fetchSearch(searchItem, currentPage);
}

async function fetchSearch(searchItem, currentPage) {
  try {
    const result = await fetchImages(searchItem, currentPage);
    if (currentPage === 1) {
      Notify.info(`Hooray! We found ${result.totalHits} images.`);
    }
    filterResult(result);
  } catch (error) {
    console.log(error);
  }
}

function filterResult(result) {
  if (currentPage === Math.ceil(result.totalHits / 40)) {
    refs.buttonLoad.classList.add('is-hidden');
    addMarkup(result.hits);
    Notify.info("We're sorry, but you've reached the end of search results.");
    lightbox.refresh();
    return;
  } else if (result.total === 0) {
    refs.buttonLoad.classList.add('is-hidden');
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    return;
  } else {
    addMarkup(result.hits);
    refs.buttonLoad.classList.remove('is-hidden');
    lightbox.refresh();
    return;
  }
}

function addMarkup(imagesArr) {
  const finishedMarkup = createList(imagesArr);
  refs.gallery.insertAdjacentHTML('beforeend', finishedMarkup);
}

function createList(imagesArr) {
  return imagesArr.reduce((acc, item) => acc + createMarkup(item), '');
}

function createMarkup(image) {
  return `
  <div class="photo-card">
         <a href="${image.largeImageURL}" class="gallery_link">
          <img class="gallery__image" src="${image.webformatURL}" alt="${image.tags}" width="370px" loading="lazy" />
          </a>
        <div class="info">
              <p class="info-item">
              <b>Likes<br>${image.likes}</b>
              </p>
              <p class="info-item">
              <b>Views<br>${image.views}</b>
              </p>
              <p class="info-item">
              <b>Comments<br>${image.comments}</b>
              </p>
              <p class="info-item">
              <b>Downloads<br>${image.downloads}</b>
              </p>
        </div>
    </div>
`;
}
