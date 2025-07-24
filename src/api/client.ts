import axios from 'axios';

const client = axios.create({
  baseURL: 'http://192.168.1.4:8000/api/v1',
  timeout: 5000,
});

export default client;
