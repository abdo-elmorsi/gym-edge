import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3001/api/v1/';
// axios.defaults.baseURL = 'http://localhost:3001/api/v1/'

// Add a request interceptor
axios.interceptors.request.use(
  (config) =>
    // Do something before request is sent
    config,
  (error) =>
    // Do something with request error
    Promise.reject(error)
);

// Add a response interceptor
axios.interceptors.response.use(
  (response) =>
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    response,
  (error) =>
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    Promise.reject(error.response.data)
);
export default axios;
