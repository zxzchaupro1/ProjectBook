import axios from 'axios';

const baseURL = 'http://192.168.0.115:3000';

const instance = axios.create({
  baseURL,
  timeout: 5000,
  headers: { accept: 'application/json' },
});

instance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);
export default instance;
