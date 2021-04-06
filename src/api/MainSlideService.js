import axios from 'axios';

// const USER_API_BASE_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
// const USER_API_BASE_URL = 'http://192.168.0.18:8080/users';
const USER_API_BASE_URL = 'http://localhost:8080';
class ApiService {
  uploadImage(file, config) {
    return axios.post(USER_API_BASE_URL + '/slide/images/upload', file, config);
  }

  slideImageList() {
    return axios.post(USER_API_BASE_URL + '/slide/searchList');
  }

  downloadImage(key) {
    return axios.post(USER_API_BASE_URL + '/slide/download' + key);
  }

  deleteImage(key) {
    return axios.post(USER_API_BASE_URL + '/slide/delete' + key);
  }

}

export default new ApiService();
