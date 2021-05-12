import * as actionTypes from './actionTypes';



export const addBook = (book) => {
    console.log('addbokk', book);
    return {
        type: actionTypes.ADD_BOOK,
        book: book
    }
}

export const getBooks = () => {
    return {
        type: actionTypes.GET_BOOKS
    }
}