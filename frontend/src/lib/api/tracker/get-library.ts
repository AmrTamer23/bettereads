import { axiosInstance } from "../instance";

export interface LibraryData {
  data: Data[];
}

interface Data {
  id: string;
  userId: string;
  bookId: string;
  startDate: unknown;
  finishDate: unknown;
  reviewid: string;
  title: string;
  coverURL: string;
  author: string;
  status: "TO_READ" | "READING" | "READ" | "TO_BUY";
  createdAt: string;
  updatedAt: string;
  progress: number;
  numberOfPages: number;
}

export async function getLibrary() {
  return await axiosInstance.get<LibraryData>(`/user-books`);
}
