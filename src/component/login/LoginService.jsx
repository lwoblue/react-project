import axios from 'axios'
const LOGIN_API_BASE_URL= "http://localhost:8080/users";
class LoginService {
    // send username, password to the SERVER
    login(id,pwd){
        return axios.post(LOGIN_API_BASE_URL+'/login', {
            id,
            pwd
        })
    }

    signUp(id,pwd,username){
        return axios.post(LOGIN_API_BASE_URL+'/signUp', {
            id,
            pwd,
            username
        })
    }

    executeHelloService() {
        console.log("===executeHelloService===")
        return axios.get('http://localhost:8080/hello');        
    }
    logout() {
        //sessionStorage.removeItem('authenticatedUser');
        localStorage.removeItem("authenticatedUser");
        localStorage.removeItem("token");
    }

    isUserLoggedIn() {
        const token = localStorage.getItem('token');
        console.log("===UserloggedInCheck===");
        console.log(token);

        if (token) {
            return true;
        }
        
        return false;
    }
}

export default new LoginService()