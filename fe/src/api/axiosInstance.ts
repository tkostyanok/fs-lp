import axios from 'axios';

// console.log('env', import.meta.env);
// const BASE_URL =
//   import.meta.env.MODE === 'production' ? `${import.meta.env.VITE_BE_SERVER_URL}` : 'http://localhost:3001';

const BASE_URL = 'http://localhost:3001';

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
