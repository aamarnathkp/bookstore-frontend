import React, { useState, useEffect } from 'react';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import EditIcon from '@material-ui/icons/Edit';

import classes from './AdminBooks.module.css';
import * as axios from '../../API/bsAxios';
import AddBookModal from '../../UI/Modal/BookFormModal';
import Pagination from '../../UI/Pagination/Pagination';


const AdminBooks = props => {

    const [booksState, setBooks] = useState([]);
    // const [authorClicked, setAuthorClicked] = useState(null);
    const [bookModalStatus, setBookModalStatus] = useState(false);
    const [addBook, setAddBook] = useState(false);
    const [booksCount, setBooksCount] = useState(0);


    useEffect(() => {
        console.log('reached useEffect');
        axios.getAllBooks()
            .then(response => {
                setBooksCount(response.data.total);
                setBooks(response.data.items);
            })
            .catch(error => {
                console.log(error);
            });
    }, [addBook]);

    let allBooks = null;
    allBooks = booksState.map(({ uuid, name, image, description, published_year, price }) => {
        return (
            <div key={uuid} className={classes.GuestBook}>
                <div className={classes.BookEdit}><EditIcon /> </div>
                <img src={image} className={classes.BookImage} alt='' />
                <p className={classes.BookTitle}>{name}</p>
                <div className={classes.BookTag}>
                    <p className={classes.BookPublish}>{published_year}</p>
                    <p className={classes.BookPrice}>RS.{price}</p>
                </div>
            </div>

        )
    });

    const onAddAuthorClick = () => {
        console.log('onClick');
        setBookModalStatus(true);
    }

    let addBookModal = null;
    if (bookModalStatus) {
        addBookModal = <AddBookModal open={bookModalStatus}
            authors={props.authors}
            addBook={setAddBook}
            toggleAddBook={addBook}
            modalClose={setBookModalStatus} />
    }


    return (
        <>
            {addBookModal}
            <div className={classes.BookMenu}>
                <div
                    onClick={onAddAuthorClick}
                    className={classes.AddBook}>
                    <AddCircleIcon fontSize={'large'} /> ADD </div>
                <Pagination count={booksCount} />
            </div>
            <div className={classes.GuestBooks}>
                {allBooks}
            </div>
        </>

    );
}

export default AdminBooks;