import { useEffect, useState, lazy, Suspense } from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import * as bookshelfApi from '../services/bookshelf-api.js';
import PageHeading from '../components/PageHeading/PageHeading';

const AuthorSubView = lazy(() => import('./AuthorSubView'));

export default function AuthorsView() {
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

  return (
    <>
      <PageHeading text="Автори" />

      {isLoading && <p>Завантаження авторів...</p>}
      {error && <p>Помилка: {error}</p>}

      {authors.length > 0 && (
        <ul>
          {authors.map(author => (
            <li key={author.id}>
              <NavLink to={`${author.id}`}>{author.name}</NavLink>
            </li>
          ))}
        </ul>
      )}

      <hr />

      <Suspense fallback={<h1>Завантажуємо підмаршрут...</h1>}>
        <Routes>
          <Route
            path=":authorId"
            element={<AuthorSubView authors={authors} />}
          />
        </Routes>
      </Suspense>
    </>
  );
}
