import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://124.43.179.118:8081',
});


// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response)=>{
    return response;
  },
  (error)=>{
    if(error.response.status === 401){
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;