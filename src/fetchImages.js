import axios from 'axios';
const KEY = `19008489-eef4c530baed43ae206c47500`;
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGES = 40;
export async function fetchImages(searchItem, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?key=${KEY}&q=${searchItem}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${PER_PAGES}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
