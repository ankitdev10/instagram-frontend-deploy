import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://insta-api-i0i8.onrender.com/api",
  withCredentials: true,
});
