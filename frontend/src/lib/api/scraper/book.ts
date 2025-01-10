import { axiosInstance } from "../instance";

export async function getBookDetails(data: { url: string }) {
  return await axiosInstance.get<GoodreadsBook>(`/books/${data.url}`);
}
