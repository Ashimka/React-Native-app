import { SERVER_URL } from "@/config/api.config";
import axios, { CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
};

const axiosPublic = axios.create(options);
const axiosWithAuth = axios.create(options);

axiosPublic.interceptors.response.use(
  (config) => config,
  (error) => {
    if (!error.response) {
      if (error.code === "ECONNABORTED") {
        error.message = "Превышено время ожидания запроса";
      } else if (error.code === "NETWORK_ERROR") {
        error.message = "Ошибка сети. Проверьте подключение к интернету";
      } else {
        error.message = "Сервер недоступен. Попробуйте позже";
      }
    }

    if (error.response?.status >= 500) {
      error.message = "Внутренняя ошибка сервера";
    } else if (error.response?.status === 404) {
      error.message = "Ресурс не найден";
    } else if (error.response?.status === 403) {
      error.message = "Доступ запрещен";
    }

    throw error;
  },
);

export { axiosPublic, axiosWithAuth };
