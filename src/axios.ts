import axios from "axios";

const instance = axios.create({
  baseURL: 'https://chefinyou-a29b6670d3a9.herokuapp.com/'
})

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
})
export default instance;