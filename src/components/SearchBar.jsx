import React from "react";
import "./SearchBar.css";

export default function SearchBar({ value, onChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for books by title..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
