import * as actionTypes from '../actions/actionTypes';

import { books, author } from '../../Data/Data';
import { updateObject } from '../../utility/utility';

const inititalState = {
    books: books,
    authors: author
}


export const addBook = (state, action) => {
    const allBooks = state.books;
    const allBooksU = allBooks.concat(action.book);
    console.log(allBooksU);
    return updateObject(state,
        { books: allBooksU });
}

export const getBooks = inititalState.books;
export const getAuthors = inititalState.authors;

const reducer = (state = inititalState, action) => {
    switch (action.type) {
        case actionTypes.ADD_BOOK: return addBook(state, action);
        default: return state
    }

};

export default reducer;