import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://ecordel-restapi.herokuapp.com'
});

export default api;

