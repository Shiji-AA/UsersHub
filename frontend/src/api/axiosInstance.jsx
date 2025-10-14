import axios from "axios";
import { ACCESS_TOKEN } from "../constants";



const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL   
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(ACCESS_TOKEN);
    console.log(token ,"TOKEN FROM AXIOS INSTANCE PAGE")
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
