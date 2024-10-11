import { instance } from "~/lib/instance";

type SuccessResponse = {
  user: {
    id: string;
    username: string;
    isAdmin: boolean;
  };
};

type ErrorResponse = {
  message: string;
};

export async function login(
  email: string,
  password: string
): Promise<SuccessResponse | ErrorResponse> {
  const res = await instance
    .post<SuccessResponse>("/auth/signin", {
      email,
      password,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      return { message: error.response?.data?.message || "An error occurred" };
    });

  return res;
}
