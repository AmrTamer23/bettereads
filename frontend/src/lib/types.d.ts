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
