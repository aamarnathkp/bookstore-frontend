import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

import Books from '../../Books/Books';
import Modal from '../../../UI/Modal/BookFormModal';
import classes from './Author.module.css';
//import { getBooks } from '../../../store/actions/index';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
}));


const Author = props => {

    // const [modalClickStatus, setModalClickStatus] = useState(false);
    const [bookModalStatus, setBookModalStatus] = useState(false);
    const [addBook, setAddBook] = useState(false);

    const classesMUI = useStyles();

    const { uuid, name, about, image } = props.author;


    const getBooks = props.books;
    const books = getBooks.filter(book => {
        return uuid === book.author_uuid
    })


    let authorDetails = null;
    authorDetails = (
        <div className={classes.Author}>
            <img src={image} className={classes.AuthorImage} alt='' />
            <div className={classes.AuthorTag}>
                <p className={classes.AuthorName}>{name}</p>
                <p className={classes.AuthorDescription}>{about}</p>
            </div>
            <div className={classes.AuthorClose}>
                <HighlightOffIcon onClick={props.close} />
            </div>
        </div>
    );

    const modalOpen = () => {
        setBookModalStatus(true);
    }

    let addBookModal = null;
    console.log(bookModalStatus);
    if (bookModalStatus) {
        addBookModal = <Modal open={bookModalStatus}
            authors={[props.author]}
            addBook={setAddBook}
            toggleAddBook={addBook}
            modalClose={setBookModalStatus} />
    }

    // const modalClose = () => {
    //     console.log('modal closed clicked');
    //     setModalClickStatus(false);
    // }

    //     let modal = null;
    //     //  if (modalClickStatus) {
    //     modal =
    //  //   }

    return (
        <div>
            {authorDetails}
            {addBookModal}

            {/* // author_id={uuid}
                // modalStatus={modalClickStatus}
                // author_name={name}
                // addBook={props.addBook}
                // closeModal={modalClose} /> */}
            <div className={classes.BookContent}>
                <Books books={books} />
            </div>
            <div className={classes.AddIcon}>
                <div className={classesMUI.root}>
                    <Fab onClick={modalOpen} color='default' aria-label="add">
                        <AddIcon />
                    </Fab>
                </div>
            </div>
        </div>
    );
}

export default Author;