import axios from 'axios';

const baseURL = 'https://6459c36b8badff578e13fe4c.mockapi.io/';

const instance = axios.create({
  baseURL,
  timeout: 5000,
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
