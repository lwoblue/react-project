import axios from 'axios';

// const USER_API_BASE_URL = "http://makeup-api.herokuapp.com/api/v1/products.json?brand=maybelline"
// const USER_API_BASE_URL = 'http://192.168.0.18:8080/users';
const USER_API_BASE_URL = 'http://localhost:8080/users';
const USER_API_BASE_URL_MSG = 'http://localhost:8080/message';
const USER_API_BASE_URL_NODE = 'http://localhost:8090/users';

class ApiService {
  fetchUsers() {
    return axios.get(USER_API_BASE_URL);
  }

  searchUser(keyword) {
    return axios.get(USER_API_BASE_URL + '/' + keyword);
  }

  fetchUserByID(userID) {
    return axios.get(USER_API_BASE_URL + '/personal-information/' + userID);
  }

  deleteUser(userID) {
    return axios.delete(USER_API_BASE_URL + '/' + userID);
  }

  addUser(user) {
    return axios.post(USER_API_BASE_URL, user);
  }

  editUser(user) {
    return axios.put(USER_API_BASE_URL + '/' + user.id, user);
  }

  fetchGoogleUser(user) {
    return axios.post(USER_API_BASE_URL_NODE + '/loginGoogle', user);
  }

  messageList(recipient, searchInput) {
    return axios.post(USER_API_BASE_URL_MSG + '/' + recipient, {
      searchInput: searchInput,
    });
  }

  detailMessage(uuid) {
    return axios.get(USER_API_BASE_URL_MSG + '/detail/' + uuid);
  }

  deleteMessage(uuid) {
    return axios.delete(USER_API_BASE_URL_MSG + '/' + uuid);
  fetchImage(file,config){
    return axios.post(USER_API_BASE_URL+'/profile/upload',file,config);
  }

  sendMessage(message) {
    return axios.post(USER_API_BASE_URL_MSG, message);
  }
}

export default new ApiService();
