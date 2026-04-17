import { Link, useLocation, useParams } from 'react-router-dom';
import { getBookSlug } from '../utils/getBookSlug';
import { useEffect, useState } from 'react';
import * as bookshelfApi from '../services/bookshelf-api.js';

export default function AuthorSubView() {
  const location = useLocation();
  const { authorId } = useParams();
  const [authors, setAuthors] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadAuthors() {
      try {
        setIsLoading(true);
        setError(null);
        const data = await bookshelfApi.fetchAuthors();
        setAuthors(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch authors');
      } finally {
        setIsLoading(false);
      }
    }

    loadAuthors();
  }, []);

  const author = authors.find(item => item.id === authorId);

  if (!author) {
    return <p>Автора не знайдено.</p>;
  }

  return (
    <>
      <h2>{author.name}</h2>

      <ul>
        {author.books.map(book => (
          <li key={book.id}>
            <Link
              to={`/books/${getBookSlug(book.title, book.id)}`}
              state={{
                from: location,
                label: 'Назад до автора',
              }}
            >
              {book.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
