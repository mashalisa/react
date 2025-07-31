import axios from 'axios';


const token = localStorage.getItem('authToken');

const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
console.log(apiUrl, 'apiUrl in axiosToken')
console.log('Token from localStorage:', token);

const axiosToken = axios.create({
    baseURL: apiUrl + '/user',
    headers: {
        'Authorization': `Bearer ${token}`
    }
});
console.log(axiosToken.defaults.baseURL, 'axiosToken in axiosToken')
export default axiosToken;