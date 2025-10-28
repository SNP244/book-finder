import React from "react";
import "./BookList.css"; // Make sure this file exists

export default function BookList({ books, onSelect, loading, onLoadMore }) {
  return (
    <div className="book-list-container">
      <div className="book-grid">
        {books.map((book) => (
          <div
            key={book.key}
            onClick={() => onSelect(book)}
            className="book-card"
          >
           <img
  src={
    book.cover_i
      ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
      : "https://via.placeholder.com/150x200/ffffff/cccccc?text=No+Cover"
  }
  alt={book.title}
  className="book-cover"
  onError={(e) => {
    e.target.onerror = null;
    e.target.src = "https://via.placeholder.com/150x200/ffffff/cccccc?text=No+Cover";
  }}
/>


            <h3 className="book-title">{book.title}</h3>
            <p className="book-author">{book.author_name?.[0] || "Unknown Author"}</p>
          </div>
        ))}
      </div>

      {!loading && books.length > 0 && (
        <div className="load-more-container">
          <button onClick={onLoadMore} className="load-more-button">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
