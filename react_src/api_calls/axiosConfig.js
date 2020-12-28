import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://team-management-api.herokuapp.com/'
});

//instance.defaults.baseURL = 'https://team-management-api.herokuapp.com/';
instance.defaults.baseURL = 'http://localhost:3000/';
instance.defaults.headers.post['Content-Type'] = 'application/json';

// Also add/ configure interceptors && all the other cool stuff


export default instance;