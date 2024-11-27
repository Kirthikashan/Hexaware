import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5006', // Replace with your backend API URL
});

export default API;
