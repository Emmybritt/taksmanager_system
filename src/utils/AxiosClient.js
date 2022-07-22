import axios from "axios";
import { baseUrl } from "./Url";

const axiosClient = axios.create({
  baseURL: baseUrl
});

const token = localStorage.getItem("token");
// console.log(token);

axiosClient.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${JSON.parse(token)}`
  return config;
});

export default axiosClient;