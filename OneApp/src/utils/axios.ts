import Axios from 'axios';

const http = Axios.create({
  timeout: 15000,
  withCredentials: true
});

export default http;
