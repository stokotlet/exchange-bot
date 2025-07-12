import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    console.log("Исходящий запрос:", {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });
    return config;
  },
  (error) => {
    console.error("Ошибка при отправке запроса:", error);
    return Promise.reject(error);
  },
);

axiosInstance.interceptors.response.use(
  (response) => {
    console.log("Ответ от сервера:", {
      status: response.status,
      data: response.data,
    });
    return response;
  },
  (error) => {
    console.error("Ошибка при получении ответа:", error);
    return Promise.reject(error);
  },
);
