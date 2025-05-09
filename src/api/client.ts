import axios from 'axios';

const client = axios.create({
  baseURL: 'https://localhost:8081',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default client;
