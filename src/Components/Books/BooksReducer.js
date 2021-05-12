import React from 'react';

import classes from './Books.module.css';
//import { books } from '../../Data/Data';



const BooksReducer = props => {

    //const [getBooks] = useState(books);

    let allBooks = null;
    allBooks = props.books.map(({ id, name, img, description, publish_year, price }) => {
        return (
            <div key={id} className={classes.Book}>
                <img src={img} className={classes.BookImage} alt=''/>
                <p className={classes.BookTitle}>{name}</p>
                <div className={classes.BookTag}>
                    <p className={classes.BookPublish}>{publish_year}</p>
                    <p className={classes.BookPrice}>RS.{price}</p>
                </div>
            </div>

        )
    })


    return (
        <div className={classes.Books}>
            {allBooks}
        </div>


    );
}

export default BooksReducer;