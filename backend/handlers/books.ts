import { type Context } from "hono";
import db from "../modules/db";
import { User } from "../../types";
const cheerio = require("cheerio");

export const getAllBooks = async (c: Context) => {
  const reqBody = await c.req.json().catch(() => null);

  if (!reqBody || !reqBody.query) {
    return c.json(
      {
        status: "Error",
        message: "Missing required field: query",
      },
      400
    );
  }

  const scrapeURL = reqBody.query.split("&")[0];

  try {
    const response = await fetch(scrapeURL, {
      method: "GET",
      headers: {
        "User-Agent":
          process.env.NEXT_PUBLIC_USER_AGENT ||
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      },
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch: ${response.status} ${response.statusText}`
      );
    }

    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const numberOfResults = $(".leftContainer > h3").text();

    const result: any[] = $("table > tbody > tr")
      .map((i: number, el: any) => {
        const $el = $(el);
        return {
          id: i + 1,
          cover: $el.find("tr > td > a > img").attr("src"),
          title: $el.find("tr > td:nth-child(2) > a > span").text(),
          bookURL: $el.find("tr > td:nth-child(2) > a").attr("href"),
          author: $el
            .find(
              "tr > td:nth-child(2) > span[itemprop='author'] > div > a > span[itemprop='name']"
            )
            .html(),
          authorURL: (
            $el
              .find("tr > td:nth-child(2) > span[itemprop='author'] > div > a")
              .attr("href") || ""
          )
            .replace("https://www.goodreads.com", "")
            .split("?")[0],
          rating: $el
            .find(
              "tr > td:nth-child(2) > div > span.greyText.smallText.uitext > span.minirating"
            )
            .text(),
        };
      })
      .toArray();

    const response_data: any = {
      status: "Received",
      source: "https://github.com/nesaku/biblioreads",
      scrapeURL: scrapeURL,
      searchType: "books",
      numberOfResults: numberOfResults,
      result: result,
      lastScraped: new Date().toISOString(),
    };

    return c.json(response_data, 200);
  } catch (error) {
    console.error(
      "Scraper error:",
      error instanceof Error ? error.message : "Unknown error"
    );

    const errorResponse: any = {
      status: "Error - Invalid Query",
      message:
        error instanceof Error ? error.message : "An unknown error occurred",
      scrapeURL: scrapeURL,
    };

    return c.json(errorResponse, 500);
  }
};

export const getBookById = async (c: Context) => {
  const id = c.req.param("id");
  const user = c.get("user") as User;

  const data = await db.book.findUnique({
    where: {
      id,
      approved: user.admin ? undefined : true,
    },
  });

  if (!data) {
    return c.json({ message: "Book not found" }, 404);
  }

  return c.json({ data });
};

export const createBook = async (c: Context) => {
  const body = await c.req.json();
  if (
    !body.title ||
    !body.author ||
    !body.numOfPages ||
    !body.bookCover ||
    !body.isbn ||
    !body.genre ||
    !body.description ||
    !body.publishedDate
  ) {
    return c.json({ message: "Missing required fields" }, 400);
  }
  const data = await db.book.create({
    data: {
      title: body.title,
      author: body.author,
      numOfPages: body.numOfPages,
      bookCover: body.bookCover,
      isbn: body.isbn,
      genre: body.genre,
      description: body.description,
      publishedDate: body.publishedDate,
    },
  });

  return c.json({ data }, 201);
};

export const updateBook = async (c: Context) => {
  const body = await c.req.json();

  const data = await db.book.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      author: body.author,
      numOfPages: body.numOfPages,
      bookCover: body.bookCover,
      isbn: body.isbn,
      genre: body.genre,
      description: body.description,
      publishedDate: body.publishedDate,
    },
  });

  return c.json({ data });
};

export const deleteBook = async (c: Context) => {
  const id = c.req.param("id");

  await db.book.delete({
    where: {
      id,
    },
  });

  return c.json({ message: "Book deleted" });
};
