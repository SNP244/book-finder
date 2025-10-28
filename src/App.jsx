import React, { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import BookList from "./components/BookList";
import BookModal from "./components/BookModal";
import { searchBooks } from "./utils/api";
import useDebounce from "./hooks/useDebounce";

export default function App() {
  const [query, setQuery] = useState("");
  const debounced = useDebounce(query, 500);
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

 useEffect(() => {
  if (!debounced.trim()) {
    setBooks([]);
    setNumFound(0);
    setError(null);
    return;
  }

  setLoading(true);
  setError(null);
  setPage(1);

  searchBooks(debounced, 1)
    .then((data) => {
      if (!data.docs || data.docs.length === 0) {
        setBooks([]);
        setNumFound(0);
        setError("No books found for your search.");
      } else {
        setBooks(data.docs);
        setNumFound(data.numFound || 0);
        setError(null);
      }
    })
    .catch(() => setError("Failed to fetch books. Please try again later."))
    .finally(() => setLoading(false));
}, [debounced]);
 

  const loadMore = () => {
    const next = page + 1;
    setLoading(true);
    searchBooks(debounced, next)
      .then((data) => {
        setBooks((prev) => [...prev, ...(data.docs || [])]);
        setPage(next);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 px-6 py-8">
      {/* Header */}
     <header className="header">
  <h1>📚 Book Finder</h1>
  <div className="search-bar-wrapper">
    <SearchBar value={query} onChange={setQuery} />
  </div>
</header>






      {/* Error or Status */}
      {error && (
  <div className="error-message">
    <p>{error}</p>
    <button className="retry-btn" onClick={() => window.location.reload()}>
      🔁 Try Again
    </button>
  </div>
)}

      {loading && <p className="text-gray-600 text-center animate-pulse">Searching books...</p>}

      {/* Book List */}
      {!error && books.length > 0 && (
        <main className="max-w-6xl mx-auto mt-8">
          <BookList
            books={books}
            loading={loading}
            numFound={numFound}
            onLoadMore={loadMore}
            onSelect={setSelectedBook}
          />
        </main>
      )}

      {/* Book Modal */}
      {selectedBook && (
        <BookModal book={selectedBook} onClose={() => setSelectedBook(null)} />
      )}
    </div>
  );
}
