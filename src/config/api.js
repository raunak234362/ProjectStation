/* eslint-disable no-undef */
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://106.51.141.125:5154',
});

export default instance;
