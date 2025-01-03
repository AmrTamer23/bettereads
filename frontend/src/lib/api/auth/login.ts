import { axiosInstance } from "../instance";

export async function login(data: { email: string; password: string }) {
  const res = await axiosInstance.post("/auth/signin", data);

  if (res.data.status === "success") {
    console.log(res.data.data.type);
    localStorage.setItem("token", res.data.data.user.token);
  }
  return res;
}
