export default function BookCard({ book, onClick }) {
  const cover = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://via.placeholder.com/128x192?text=No+Cover";

  return (
    <div
      onClick={onClick}
      className="cursor-pointer bg-white p-4 rounded-xl shadow hover:shadow-md transition"
    >
      <img
        src={cover}
        alt={book.title}
        className="w-full h-56 object-cover rounded-lg mb-3"
      />
      <h3 className="font-semibold text-lg mb-1">{book.title}</h3>
      <p className="text-sm text-gray-700">
        {book.author_name ? book.author_name.join(", ") : "Unknown Author"}
      </p>
      <p className="text-xs text-gray-500 mt-1">
        First published: {book.first_publish_year || "N/A"}
      </p>
    </div>
  );
}
