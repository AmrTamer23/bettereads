import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
  },
});

const getLocalStorageItem = (key: string): string | null => {
  if (typeof window !== "undefined") {
    return window.localStorage.getItem(key);
  }
  return null;
};

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        window.localStorage.removeItem("token");
      }
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);

instance.interceptors.request.use(
  (config) => {
    const currentToken = getLocalStorageItem("token");
    if (currentToken) {
      config.headers.Authorization = `Bearer ${currentToken}`;
    }

    console.log(config);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
