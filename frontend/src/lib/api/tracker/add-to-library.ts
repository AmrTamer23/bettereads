import { axiosInstance } from "../instance";

export async function addToLibrary(data: {
  bookId: string;
  status: "TO_BUY" | "TO_READ" | "READING" | "READ";
  startDate?: string | null;
  finishDate?: string | null;
  numberOfPages?: number;
  title: string;
  coverURL: string;
  author: string;
  progress: number;
}) {
  return await axiosInstance.post<GoodreadsBook>(`/user-books`, data);
}
