import React, { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';

import Books from '../Books/Books';
import classes from './GuestPage.module.css';
import flip from './GuestBooks.module.css';
import * as axios from '../../API/bsAxios';

const GuestBooksSection = props => {

    const [books, addBooks] = useState([]);
    const [searchedBooks, updateSearchBooks] = useState([]);
    const [bookSearch, setBookSearch] = useState('');


    useEffect(() => {
        axios.getAllGuestBooks()
            .then(response => {
                console.log(response);
                // const count = response.data.total;
                const allBooks = response.data.items;
               // setBooksCount(count);
                addBooks(allBooks);
                updateSearchBooks(allBooks);
            })
            .then(error => {
                console.log(error)
            })

    }, []);

    const searchInputHandler = (searchKey) => {
        let allBooks = books;
        if (searchKey === '') {
            updateSearchBooks(allBooks);
        } else {
            const searchLower = searchKey.toLowerCase();
            const allBooksU = allBooks.filter(({ name }) => {
                const nameLower = name.toLowerCase();
                return nameLower.includes(searchLower);
            })
            updateSearchBooks(allBooksU);
        }
    }


    const searchBookonEnter = event => {
        if (event.keyCode === 13) {
            searchInputHandler(event.target.value);
          }
    }

    let inputElement = <input
        type='text'
        placeholder='books search'
        value={bookSearch}
        className={classes.SearchInput}
        onKeyDown={(event) => searchBookonEnter(event)}
        onChange={(event) => inputChangedHandler(event)}
    />;

    const inputChangedHandler = (event, value) => {
        console.log('input change handler clicked');
        setBookSearch(event.target.value);
    }

    return (
        <div className={classes.Container}>
            {/* <div className={classes.ItemName}> Books</div> */}


            <div className={flip.FlipBox}>
                <div className={flip.FlipBoxInner}>
                    <div className={flip.FlipBoxFront}>
                        Books
                    </div>
                    <div className={flip.FlipBoxBack}>
                        <div className={flip.InputContainer}>
                            {inputElement}
                            <SearchIcon onClick={() => searchInputHandler(bookSearch)} />
                        </div>
                    </div>
                </div>
            </div>


            <div className={classes.ItemContainer} >
                <div className={classes.ItemContainerBox}>
                    <div className={classes.ItemBooks}>
                        <Books books={searchedBooks} />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GuestBooksSection;