// app/fetch-posts/page.tsx
"use client"
import { useEffect, useState } from 'react';

export default function FetchBooks() {
  const [books, setBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch('/api/external');
        if (!res.ok) {
          throw new Error('Failed to fetch books');
        }
        const data = await res.json();
        setBooks(data.items); // Google Books API returns books in 'items' array
      } catch (error: any) {
        setError(error.message); // Handle errors
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchBooks(); // Fetch books data
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Books Related to React</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {books.map((book: any) => (
          <div key={book.id} className="bg-white shadow-md rounded-lg p-4">
            <img 
              src={book.volumeInfo.imageLinks?.thumbnail || '/default-book-cover.jpg'} 
              alt={book.volumeInfo.title} 
              className="w-full h-48 object-cover rounded-md mb-4" 
            />
            <h2 className="text-xl font-semibold">{book.volumeInfo.title}</h2>
            <p className="text-gray-700">{book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown Author'}</p>
            <p className="text-gray-500 text-sm mt-2">{book.volumeInfo.publishedDate}</p>
            <p className="text-gray-800 mt-3">{book.volumeInfo.description?.slice(0, 150)}...</p>
            <a 
              href={book.volumeInfo.infoLink} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-blue-500 mt-3 block"
            >
              View More
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
