import { createSelector } from 'reselect';

const selectBooksState = state => state.books;

export const selectBooks = createSelector(
  [selectBooksState],
  booksState => booksState.items,
);

export const selectSelectedBook = createSelector(
  [selectBooksState],
  booksState => booksState.selectedBook,
);

export const selectBooksLoading = createSelector(
  [selectBooksState],
  booksState => booksState.isBooksLoading,
);

export const selectBookDetailsLoading = createSelector(
  [selectBooksState],
  booksState => booksState.isBookDetailsLoading,
);

export const selectBooksError = createSelector(
  [selectBooksState],
  booksState => booksState.booksError,
);

export const selectBookDetailsError = createSelector(
  [selectBooksState],
  booksState => booksState.bookDetailsError,
);

export const selectBooksCount = createSelector(
  [selectBooks],
  books => books.length,
);

export const selectSortedBooks = createSelector([selectBooks], books =>
  [...books].sort((a, b) => a.title.localeCompare(b.title)),
);

export const makeSelectBookById = () =>
  createSelector(
    [selectBooks, (_, bookId) => String(bookId)],
    (books, bookId) => books.find(book => String(book.id) === bookId) ?? null,
  );
