export async function searchBooks(title, page = 1) {
  const q = encodeURIComponent(title);
  const url = `https://openlibrary.org/search.json?title=${q}&page=${page}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch books");
  return res.json();
}
