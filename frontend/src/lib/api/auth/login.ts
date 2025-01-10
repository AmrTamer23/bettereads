import { axiosInstance } from "../instance";

export async function login(data: { email: string; password: string }) {
  const res = await axiosInstance.post("/auth/signin", data);

  if (res.status === 200) {
    console.log(res.status === 200);
    localStorage.setItem("token", res.data.user.token);
    return res;
  } else {
    console.log(res);
  }
}
