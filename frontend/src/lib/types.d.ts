interface BooksScrapeRoot {
  status: string;
  source: string;
  scrapeURL: string;
  searchType: string;
  numberOfResults: string;
  result: Result[];
  lastScraped: string;
}

interface BooksScrapedResult {
  id: number;
  cover: string;
  title: string;
  bookURL: string;
  author: string;
  authorURL: string;
  rating: string;
}

// Author type for the author array
type Author = {
  id: number;
  name: string;
  url: string;
};

// Review type for the reviews array
type Review = {
  id: string;
  // image: string;
  // author: string;
  // date: string;
  stars: number;
  text: string;
  // likes: string;
};

// Main GoodreadsBook type
interface GoodreadsBook {
  status: string;
  statusCode: number;
  source: string;
  scrapeURL: string;
  cover: string;
  series: string;
  seriesURL: string;
  workURL: string;
  title: string;
  author: Author[];
  rating: string;
  ratingCount: string;
  reviewsCount: string;
  desc: string;
  genres: string[];
  bookEdition: string;
  publishDate: string;
  related: unknown[]; // This was an empty array in the provided data
  reviewBreakdown: {
    rating5: string;
    rating4: string;
    rating3: string;
    rating2: string;
    rating1: string;
  };
  reviews: Review[];
  quotes: string;
  quotesURL: string;
  questions: string;
  questionsURL: string;
  lastScraped: string;
}
