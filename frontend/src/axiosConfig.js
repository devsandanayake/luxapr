import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081',
});

// Add an interceptor to include the token in every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response)=>{
    return response;
  },
  (error)=>{
    if(error.response.status === 401){
      alert('Session expired. Please login again');
      localStorage.removeItem('token');
      window.location = '/login';
    }
    return Promise.reject(error);
  }
);


export default axiosInstance;