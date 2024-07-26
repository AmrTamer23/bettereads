type User = {
  id: string;
  createdAt: Date;
  userName: string;
  password: string;
  email: string;
  avatar: string;
  books: UserBook[];
};

type Book = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  author: string;
  numOfPages: number;
  bookCover: string;
  isbn?: string;
  description?: string;
  genre?: string;
  publishedDate?: Date;
  users: UserBook[];
};

type UserBook = {
  id: string;
  userId: string;
  bookId: string;
  startDate?: Date;
  finishDate?: Date;
  rating?: number;
  review?: string;
  status: ReadStatus;
  createdAt: Date;
  updatedAt: Date;
  user: User;
  book: Book;
  progress?: number;
};

enum ReadStatus {
  TO_BUY = "TO_BUY",
  TO_READ = "TO_READ",
  READING = "READING",
  READ = "READ",
}

declare namespace Express {
  export interface Request {
    user?: User;
  }
}
