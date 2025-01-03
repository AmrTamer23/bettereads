import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3005",
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${process.env.API_KEY}`,
  },
});
