import { axiosInstance } from "../instance";

export async function addToLibrary(data: {
  bookId: string;
  status: "TO_BUY" | "TO_READ" | "READING" | "READ";
  finishDate?: string | null;
  numberOfPages?: number;
  title: string;
  coverURL: string;
  startDate?: string | null;
  author: string;
  progress: number;
}) {
  return await axiosInstance.post<GoodreadsBook>(`/user-books`, data);
}

export async function updateProgress(data: {
  bookId: string;
  status: "READING" | "READ";
  startDate?: string | null;
  finishDate?: string | null;
  numberOfPages?: number;
  progress: number;
}) {
  return await axiosInstance.post<GoodreadsBook>(`/user-books`, data);
}
