import { axiosInstance } from "../instance";

export function register(data: {
  email: string;
  password: string;
  username: string;
}) {
  return axiosInstance.post("/auth/signup", data);
}
