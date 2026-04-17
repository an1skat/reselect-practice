import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import PageHeading from '../components/PageHeading/PageHeading';
import {
  fetchBooks,
  selectSortedBooks,
  selectBooksLoading,
  selectBooksError,
} from '../redux/books';
import { getBookSlug } from '../utils/getBookSlug';

export default function BooksView() {
  const dispatch = useDispatch();
  const location = useLocation();

  const books = useSelector(selectSortedBooks);
  const isLoading = useSelector(selectBooksLoading);
  const error = useSelector(selectBooksError);

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <>
      <PageHeading text="Книги" />

      {isLoading && <p>Завантаження книг...</p>}
      {error && <p>Помилка: {error}</p>}

      {books.length > 0 && (
        <ul>
          {books.map(book => (
            <li key={book.id}>
              <Link
                to={`/books/${getBookSlug(book.title, book.id)}`}
                state={{
                  from: location,
                  label: 'Назад до всіх книг',
                }}
              >
                {book.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
