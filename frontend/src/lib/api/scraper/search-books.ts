import { axiosInstance } from "../instance";

export async function searchBooks(data: { query: string }) {
  return await axiosInstance.post<BooksScrapeRoot>("/search-books", {
    query: "https://www.goodreads.com/search?q=" + data.query,
  });
}
