import axios from 'axios';

const isLocal = window.location.hostname === 'localhost';
const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || (isLocal ? 'http://localhost:5000/api' : 'https://apnaevents.onrender.com/api'),
    withCredentials: true,
});

export default api;
