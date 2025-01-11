export function Sidebar({
  genres,
  bookEdition,
  publishDate,
}: {
  genres: string[];
  bookEdition: string;
  publishDate: string;
}) {
  return (
    <div className="lg:w-1/3">
      <div className="bg-card p-6 rounded-lg shadow-md border">
        <h3 className="text-xl font-semibold mb-4">Book Details</h3>
        <div className="mb-4">
          <h4 className="font-semibold">Genres</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {genres
              .filter((it) => it !== "")
              .map((genre) => (
                <span
                  key={genre}
                  className="px-2 py-1 bg-card text-sm rounded-full text-foreground border"
                >
                  {genre}
                </span>
              ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Edition</h4>
          <p className="text-sm text-muted-foreground font-mono">
            {bookEdition}
          </p>
        </div>
        <div>
          <h4 className="font-semibold">Published</h4>
          <p className="text-sm text-muted-foreground font-mono">
            {publishDate}
          </p>
        </div>
      </div>
    </div>
  );
}
