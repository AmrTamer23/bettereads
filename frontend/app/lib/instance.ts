import axios from "axios";

export const instance = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
