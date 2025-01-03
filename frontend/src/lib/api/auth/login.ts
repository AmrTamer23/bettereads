import { axiosInstance } from "../instance";

export function login(data: { email: string; password: string }) {
  return axiosInstance.post("/auth/signin", data);
}
