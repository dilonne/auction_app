import axios from 'axios'

const access_token = localStorage.getItem('access');
const headers = {
    'Content-Type': 'application/json',
    'accept': 'application/json'
}

if(access_token){
    headers.Authorization =  `Bearer ${access_token}` 

}

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api/v1/',
    timeout: 5000,
    headers: headers
});

export default axiosInstance;