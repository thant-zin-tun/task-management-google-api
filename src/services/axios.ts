import axios, { AxiosInstance } from "axios";

import Cookies from "universal-cookie";
import { baseUrl } from "../constants/baseUrl";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: baseUrl,
});

const cookies = new Cookies();

axiosInstance.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized!");
      cookies.remove("ACT");
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config: any) => {
  const token = cookies.get("ACT");
  if (token == "" || token == undefined || token == null) {
    return config;
  } else {
    config.headers["Authorization"] = `Bearer ${token}`;
    return config;
  }
});

export default axiosInstance;
