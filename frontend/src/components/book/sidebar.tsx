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
    <div className="md:w-1/3">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold mb-4">Book Details</h3>
        <div className="mb-4">
          <h4 className="font-semibold">Genres</h4>
          <div className="flex flex-wrap gap-2 mt-2">
            {genres.map((genre) => (
              <span
                key={genre}
                className="px-2 py-1 bg-gray-200 text-sm rounded-full text-gray-700"
              >
                {genre}
              </span>
            ))}
          </div>
        </div>
        <div className="mb-4">
          <h4 className="font-semibold">Edition</h4>
          <p className="text-sm text-gray-700">{bookEdition}</p>
        </div>
        <div>
          <h4 className="font-semibold">Published</h4>
          <p className="text-sm text-gray-700">{publishDate}</p>
        </div>
      </div>
    </div>
  );
}
