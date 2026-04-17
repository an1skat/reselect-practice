import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export async function fetchAuthors() {
  const [{ data: authors }, { data: books }] = await Promise.all([
    api.get('/authors'),
    api.get('/books'),
  ]);

  return authors.map(author => ({
    ...author,
    books: books.filter(book => String(book.authorId) === String(author.id)),
  }));
}

export async function fetchBooks() {
  const { data } = await api.get('/books');
  return data;
}

export async function fetchBookById(bookId) {
  const { data: book } = await api.get(`/books/${bookId}`);
  const { data: author } = await api.get(`/authors/${book.authorId}`);

  return {
    ...book,
    author,
  };
}
