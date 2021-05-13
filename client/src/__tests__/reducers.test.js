import {useReducer} from 'react';
import {UPDATE_BOOKS, UPDATE_CURRENT_BOOK} from '../utils/actions';

const initialState = {
  books: [],
  currentBook: {
    _id: '1',
    title: 'Book 1',
    author: 'Author One',
    pages: 123,
    description: 'test book'
  }
};

test('UPDATE_BOOKS',  () => {
  let newState = reducer(initialState, {
    type: UPDATE_BOOKS,
    books: [{}, {}]
  });

  expect(newState.books.length).toBe(2);
  expect(initialState.books.length).toBe(0)
});

