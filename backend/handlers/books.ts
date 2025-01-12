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

export const getBookByURL = async (c: Context) => {
  const url = c.req.param("url");

  try {
    const response = await fetch(`https://www.goodreads.com/book/show/${url}`, {
      method: "GET",
      headers: new Headers({
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36",
      }),
    });
    const htmlString = await response.text();
    const $ = cheerio.load(htmlString);
    const cover = $(".ResponsiveImage").attr("src");
    const series = $("h3.Text__italic").text();
    const seriesURL = $("h3.Text__italic > a").attr("href");
    const workURL = $('meta[property="og:url"]').attr("content");
    const title = $('h1[data-testid="bookTitle"]').text();
    const author = $(".ContributorLinksList > span > a")
      .map((i: number, el: any) => {
        const $el = $(el);
        const name = $el.find("span").text();
        const url = $el.attr("href").replace("https://www.goodreads.com", "");
        const id = i + 1;
        return {
          id: id,
          name: name,
          url: url,
        };
      })
      .toArray();
    const rating = $("div.RatingStatistics__rating").text().slice(0, 4);
    const ratingCount = $('[data-testid="ratingsCount"]')
      .text()
      .split("rating")[0];
    const reviewsCount = $('[data-testid="reviewsCount"]').text();
    const desc = $('[data-testid="description"]').text();
    const genres = $('[data-testid="genresList"] > ul > span > span')
      .map((i: any, el: any) => $(el).find("span").text().replace("Genres", ""))
      .get();
    const bookEdition = $('[data-testid="pagesFormat"]').text();
    const publishDate = $('[data-testid="publicationInfo"]').text();
    const related = $("div.DynamicCarousel__itemsArea > div > div")
      .map((i: number, el: any) => {
        const $el = $(el);
        const title = $el
          .find('div > a > div:nth-child(2) > [data-testid="title"]')
          .html();
        const author = $el
          .find('div > a > div:nth-child(2) > [data-testid="author"]')
          .html();
        const src = $el
          .find("div > a > div:nth-child(1) > div > div > img")
          .attr("src");
        const url = $el
          .find("div > a")
          .attr("href")
          .replace("https://www.goodreads.com", "");
        const id = i + 1;
        return {
          id: id,
          src: src,
          title: title,
          author: author,
          url: url,
        };
      })
      .toArray();

    const rating5 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(1) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");
    const rating4 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(2) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");
    const rating3 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(3) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");

    const rating2 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(4) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");

    const rating1 = $(
      ".ReviewsSectionStatistics__histogram > div > div:nth-child(5) > div:nth-child(3)"
    )
      .text()
      .split("(")[0]
      .replace(" ", "");

    const reviewBreakdown = {
      rating5: rating5,
      rating4: rating4,
      rating3: rating3,
      rating2: rating2,
      rating1: rating1,
    };

    const reviews = $(".ReviewsList > div:nth-child(2) > div")
      .filter(Boolean)
      .map((i: number, el: any) => {
        const $el = $(el);
        const image = $el
          .find("div > article > div > div > section > a > img")
          .attr("src");
        const author = $el
          .find(
            "div > article > div > div > section:nth-child(2) > span:nth-child(1) > div > a"
          )
          .text();
        const date = $el
          .find("div > article > section > section:nth-child(1) > span > a")
          .text();
        const stars = $el
          .find("div > article > section > section:nth-child(1) > div > span")
          .attr("aria-label");
        const text = $el
          .find(
            "div > article > section > section:nth-child(2) > section > div > div > span"
          )
          .html();
        const likes = $el
          .find(
            "div > article > section > footer > div > div:nth-child(1) > button > span"
          )
          .text();
        const id = i + 1;

        return {
          id: id,
          image: image,
          author: author,
          date: date,
          stars: stars,
          text: text,
          likes: likes,
        };
      })
      .toArray();

    const quotes = $(
      "div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(1) > div.DiscussionCard__middle > div.DiscussionCard__stats"
    ).text();
    const quotesURL = $(
      "div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(1)"
    ).attr("href");

    const questions = $(
      "div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(3) > div.DiscussionCard__middle > div.DiscussionCard__stats"
    ).text();
    const questionsURL = $(
      "div.BookDiscussions > div.BookDiscussions__list > a.DiscussionCard:nth-child(3)"
    ).attr("href");
    const lastScraped = new Date().toISOString();
    {
      title === "" ? c.status(504) : c.status(200);
    }

    return c.json({
      status: "Received",
      statusCode: c.res.status,
      source: "https://github.com/nesaku/biblioreads",
      scrapeURL: `https://www.goodreads.com/books/show/${url}`,
      cover: cover,
      series: series,
      seriesURL: seriesURL,
      workURL: workURL,
      title: title,
      author: author,
      rating: rating,
      ratingCount: ratingCount,
      reviewsCount: reviewsCount,
      desc: desc,
      genres: genres,
      bookEdition: bookEdition,
      publishDate: publishDate,
      related: related,
      reviewBreakdown: reviewBreakdown,
      reviews: reviews,
      quotes: quotes,
      quotesURL: quotesURL,
      questions: questions,
      questionsURL: questionsURL,
      lastScraped: lastScraped,
    });
  } catch (error) {
    c.status(404);
    console.error("An error has occurred with the scraper.");
    return c.json({
      status: "Error - Invalid Query",
      url: url,
    });
  }
};

// export const createBook = async (c: Context) => {
//   const body = await c.req.json();
//   if (
//     !body.title ||
//     !body.author ||
//     !body.numOfPages ||
//     !body.bookCover ||
//     !body.isbn ||
//     !body.genre ||
//     !body.description ||
//     !body.publishedDate
//   ) {
//     return c.json({ message: "Missing required fields" }, 400);
//   }
//   const data = await db.book.create({
//     data: {
//       title: body.title,
//       author: body.author,
//       numOfPages: body.numOfPages,
//       bookCover: body.bookCover,
//       isbn: body.isbn,
//       genre: body.genre,
//       description: body.description,
//       publishedDate: body.publishedDate,
//     },
//   });

//   return c.json({ data }, 201);
// };

// export const updateBook = async (c: Context) => {
//   const body = await c.req.json();

//   const data = await db.book.update({
//     where: {
//       id: body.id,
//     },
//     data: {
//       title: body.title,
//       author: body.author,
//       numOfPages: body.numOfPages,
//       bookCover: body.bookCover,
//       isbn: body.isbn,
//       genre: body.genre,
//       description: body.description,
//       publishedDate: body.publishedDate,
//     },
//   });

//   return c.json({ data });
// };

// export const deleteBook = async (c: Context) => {
//   const id = c.req.param("id");

//   await db.book.delete({
//     where: {
//       id,
//     },
//   });

//   return c.json({ message: "Book deleted" });
// };
