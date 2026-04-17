import { useEffect } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import PageHeading from '../components/PageHeading/PageHeading';
import {
  fetchBookById,
  clearSelectedBook,
  selectSelectedBook,
  selectBookDetailsLoading,
  selectBookDetailsError,
} from '../redux/books';
import { getBookIdFromSlug } from '../utils/getBookSlug';

export default function BookDetailsView() {
  const { slug } = useParams();
  const location = useLocation();
  const dispatch = useDispatch();

  const bookId = getBookIdFromSlug(slug);
  const book = useSelector(selectSelectedBook);
  const isLoading = useSelector(selectBookDetailsLoading);
  const error = useSelector(selectBookDetailsError);

  useEffect(() => {
    if (!bookId) return;

    dispatch(fetchBookById(bookId));

    return () => {
      dispatch(clearSelectedBook());
    };
  }, [dispatch, bookId]);

  const backLink = location.state?.from ?? '/books';
  const backLabel = location.state?.label ?? 'Назад';

  return (
    <>
      <PageHeading text={`Книга ${slug}`} />

      <Link to={backLink}>{backLabel}</Link>
      <hr />

      {isLoading && <p>Завантаження книги...</p>}
      {error && <p>Помилка: {error}</p>}

      {book && (
        <>
          <img src={book.imgUrl} alt={book.title} />
          <h2>{book.title}</h2>
          <p>Автор: {book.author?.name}</p>
          <p>{book.descr}</p>
        </>
      )}
    </>
  );
}
