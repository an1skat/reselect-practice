import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import AppBar from './components/AppBar/AppBar';
import Container from './components/Container/Container';

const HomeView = lazy(() => import('./views/HomeView'));
const BooksView = lazy(() => import('./views/BooksView'));
const BookDetailsView = lazy(() => import('./views/BookDetailsView'));
const NotFoundView = lazy(() => import('./views/NotFoundView'));
const AuthorsView = lazy(() => import('./views/AuthorsView'));
const AuthorsSubView = lazy(() => import('./views/AuthorSubView.jsx'));

export default function App() {
  return (
    <Container>
      <AppBar />

      <Suspense fallback={<h1>Завантажуємо сторінку...</h1>}>
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/authors" element={<AuthorsView />} />
          <Route path="/authors/:authorId" element={<AuthorsSubView />} />
          <Route path="/books" element={<BooksView />} />
          <Route path="/books/:slug" element={<BookDetailsView />} />
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </Suspense>
    </Container>
  );
}
