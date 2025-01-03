// prisma/seed.ts

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      username: "john_doe",
      password: "password123",
      email: "john@example.com",
      avatar: "https://example.com/avatar1.png",
      admin: false,
    },
  });

  const user2 = await prisma.user.create({
    data: {
      username: "jane_doe",
      password: "password456",
      email: "jane@example.com",
      avatar: "https://example.com/avatar2.png",
      admin: true,
    },
  });

  // Create books
  const book1 = await prisma.book.create({
    data: {
      title: "The Great Gatsby",
      author: "F. Scott Fitzgerald",
      numOfPages: 180,
      bookCover: "https://example.com/gatsby.png",
      isbn: "9780743273565",
      description: "A novel set in the 1920s.",
      genre: "Fiction",
      publishedDate: new Date("1925-04-10"),
    },
  });

  const book2 = await prisma.book.create({
    data: {
      title: "1984",
      author: "George Orwell",
      numOfPages: 328,
      bookCover: "https://example.com/1984.png",
      isbn: "9780451524935",
      description: "A dystopian novel about totalitarianism.",
      genre: "Dystopian",
      publishedDate: new Date("1949-06-08"),
    },
  });

  // Create user-book relationships
  await prisma.userBook.create({
    data: {
      userId: user1.id,
      bookId: book1.id,
      startDate: new Date(),
      finishDate: null,
      rating: 5,
      review: "A masterpiece!",
      status: "READ",
      progress: 100,
    },
  });

  await prisma.userBook.create({
    data: {
      userId: user2.id,
      bookId: book2.id,
      startDate: new Date(),
      finishDate: null,
      rating: 4,
      review: "Very thought-provoking.",
      status: "READING",
      progress: 50,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
