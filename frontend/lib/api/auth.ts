import { instance } from "../../lib/instance";

export async function login(email: string, password: string) {
  const res = await instance
    .post<{
      token: string;
    }>("/auth/signin", {
      email,
      password,
    })
    .then((res) => {
      return res.data;
    });

  if (typeof window !== "undefined") {
    localStorage.setItem("token", res.token);
  }

  return res;
}
