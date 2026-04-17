import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as bookshelfApi from '../../services/bookshelf-api.js';

const initialState = {
  items: [],
  selectedBook: null,
  isLoading: false,
  error: null,
};

export const fetchBooks = createAsyncThunk(
  'books/fetchBooks',
  async (_, thunkAPI) => {
    try {
      return await bookshelfApi.fetchBooks();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch books');
    }
  },
);

export const fetchBookById = createAsyncThunk(
  'books/fetchBookById',
  async (bookId, thunkAPI) => {
    try {
      return await bookshelfApi.fetchBookById(bookId);
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message || 'Failed to fetch book');
    }
  },
);

const booksSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    clearSelectedBook(state) {
      state.selectedBook = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBooks.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBooks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload;
      })
      .addCase(fetchBooks.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      })

      .addCase(fetchBookById.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchBookById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.selectedBook = action.payload;
      })
      .addCase(fetchBookById.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
      });
  },
});

export const { clearSelectedBook } = booksSlice.actions;
export default booksSlice.reducer;
