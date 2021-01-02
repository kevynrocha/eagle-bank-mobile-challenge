import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.100.20:3333/api/v1/',
  validateStatus: status => {
    return status >= 200 && status <= 422;
  }
});

export default api;
