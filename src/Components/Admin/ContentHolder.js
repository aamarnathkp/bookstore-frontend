import React, { useState, useEffect } from 'react';

import classes from './ContentHolder.module.css';
import Authors from '../Authors/AdminAuthors';
import Dashboard from '../DashBoard/Dashboard';
import Books from '../Books/AdminBooks';
// import Quiz from '../AdminQuiz/AdminQuiz';
import Quiz from '../AdminQuiz/AdminQuizMUI';
import * as axios from '../../API/bsAxios';


const ContentHolder = props => {

    const [authors, setAuthors] = useState([]);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        console.log('reached useEffect');
        axios.getAllAuthors()
            .then(response => {
                console.log(response.data.items);
                setAuthors(response.data.items);
                axios.getAllGuestBooks()
                    .then(response => {
                        const allBooks = response.data.items;
                        setBooks(allBooks);
                    })
                    .then(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    let activeContent = null;
    switch (props.menuClicked) {
        case 'HOME' :
            activeContent = <Dashboard />;
            break;
        case 'AUTHORS':
            activeContent = <Authors
                books={books}
                addBook={[]} />;
            break;
        case 'BOOKS':
            activeContent = <Books authors={authors} />;
            break;
        case 'QUIZ':
            activeContent = <Quiz />
            break;
        default:
            activeContent = props.menuClicked;
            break;
    }


    return (
        <div className={classes.Holder}>
            <div className={classes.HolderContent}>
                {activeContent}
            </div>
        </div>
    );
}

export default ContentHolder;