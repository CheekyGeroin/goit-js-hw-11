import axios from 'axios';
const KEY = '19008489-eef4c530baed43ae206c47500';
const options = {
  key: KEY,
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
};
export async function fetchImages(searchItem) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?q="${searchItem}"`,
      options
    );
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
