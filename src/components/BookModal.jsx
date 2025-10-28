import React from "react";
import "./BookModal.css";

export default function BookModal({ book, onClose }) {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <div className="modal-body">
          <img
            src={
              book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
                : "https://via.placeholder.com/200x300?text=No+Cover"
            }
            alt={book.title}
            className="modal-image"
          />
          <h2 className="modal-title">{book.title}</h2>
          <p>
            <strong>Author:</strong> {book.author_name?.[0] || "Unknown"}
          </p>
          <p>
            <strong>First Published:</strong> {book.first_publish_year || "N/A"}
          </p>
          <p className="modal-key">Work Key: {book.key}</p>
        </div>
      </div>
    </div>
  );
}
