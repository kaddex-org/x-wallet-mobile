import axios from 'axios';
import {SERVER_REMOTE_URL} from './constants';
import {Platform} from 'react-native';

const axiosInstance = axios.create({
  baseURL: SERVER_REMOTE_URL,
});

axiosInstance.interceptors.request.use(
  function (config) {
    return {
      ...config,
      headers: {
        ...config.headers,
        platform: Platform.OS,
      },
    };
  },
  function (error) {
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

export default axiosInstance;
