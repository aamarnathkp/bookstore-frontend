import React from 'react';

import Toolbar from '../../UI/ToolBar/ToolbarBase';
import Books from '../Books/Books';
import classes from './Guest.module.css';


const guest = props => {
    return (
        <div>
            <Toolbar
                logout={props.logout}
                authors={props.authors}
                //toolbarStatus={toolbarStatus}
                search={props.search}
                user={props.user} />
            <div className={classes.BooksContainer}>
                <Books
                    booksFor='guest'
                    books={props.books} />
            </div>

        </div>
    );
}

export default guest;