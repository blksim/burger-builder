import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-16d1b.firebaseio.com/'
});

export default instance;