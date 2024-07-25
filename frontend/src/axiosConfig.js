import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://124.43.179.118:8081',
});

export default axiosInstance;