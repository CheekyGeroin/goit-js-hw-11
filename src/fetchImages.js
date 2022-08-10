import axios from 'axios';
const KEY = `19008489-eef4c530baed43ae206c47500`;
export async function fetchImages(searchItem) {
  try {
    const response = await axios.get(
      `https://pixabay.com/api/?key=${KEY}&q=${searchItem}&image_type=photo&orientation=horizontal&safesearch=true`
    );
    return response;
  } catch (error) {
    console.log(error);
  }
}
