import axios from 'axios';

const api = axios.create({
  baseURL: 'http://www.recipepuppy.com/api/',
});

export default api;
