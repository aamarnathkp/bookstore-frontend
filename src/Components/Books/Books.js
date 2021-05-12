import React from 'react';

import classes from './Books.module.css';


const BooksBase = props => {

    //const [getBooks] = useState(books);

    let allBooks = null;
    let Books = classes.Books;
    let Book = classes.Book;
    if (props.booksFor) {
        Books = classes.GuestBooks
        Book = classes.GuestBook
    }


    allBooks = props.books.map(({ uuid, name, image, description, published_year, price }) => {
        return (
            <div key={uuid} className={Book}>
                <img src={image} className={classes.BookImage} alt=''/>
                <p className={classes.BookTitle}>{name}</p>
                <div className={classes.BookTag}>
                    <p className={classes.BookPublish}>{published_year}</p>
                    <p className={classes.BookPrice}>RS.{price}</p>
                </div>
            </div>

        )
    })


    return (
        <div className={Books}>
            {allBooks}
        </div>

    );
}

export default BooksBase;