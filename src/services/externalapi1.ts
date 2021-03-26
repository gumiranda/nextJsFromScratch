import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.openbrewerydb.org/',
});

export default api;
