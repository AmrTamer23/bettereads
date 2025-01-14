import { axiosInstance } from "../instance";

interface Root {
  data: Data[];
}

interface Data {
  id: string;
  userId: string;
  bookId: string;
  startDate: unknown;
  finishDate: unknown;
  reviewid: unknown;
  title: string;
  coverURL: string;
  author: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
  numberOfPages: number;
}

export async function getLibrary() {
  return await axiosInstance.get<Root>(`/user-books`);
}
