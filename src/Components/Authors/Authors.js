import React, { useState, useEffect } from 'react';
//import { Redirect } from 'react-router-dom';

//import { author } from '../../Data/Data';
import classes from './Authors.module.css';
import Author from './Author/Author';
import Toolbar from '../../UI/ToolBar/ToolbarBase';
import * as axios from '../../API/bsAxios';
//import { logout } from '../../store/actions/index';

const Authors = props => {

    const [authorsState, setAuthors] = useState([]);    
    const [authorClicked, setAuthorClicked] = useState(null);
    const [toolbarStatus, setToolbarStatus] = useState('Authors');


    useEffect(() => {
        console.log('reached useEffect');
        axios.getAllAuthors()
            .then(response => {
                console.log(response.data.items);
                setAuthors(response.data.items);
            })
            .catch(error => {
                console.log(error);
            });
    }, [toolbarStatus]); // [] If there are no dependencies in it, that means it will stay the same all the time, and will not call the function again.

    let authorDetails = null;
    const onAuthorClick = (authorD) => {
        const { name } = authorD;
        setToolbarStatus(name + "'s Books");
        setAuthorClicked(authorD);
    }

    const onClickBackIcon = () => {
        setToolbarStatus('Authors');
        setAuthorClicked(null);
    }


    let authors = null;
    if (!authorClicked) {
        authors = authorsState.map((details) => {
            const { uuid, name, about } = details;
            return (
                <div
                    onClick={() => onAuthorClick(details)}
                    key={uuid}
                    className={classes.Author}>
                    <div className={classes.AuthorImage} />
                    <div className={classes.AuthorTag}>
                        <p className={classes.AuthorName}>{name}</p>
                        <p className={classes.AuthorDescription}>{about}</p>
                    </div>

                </div>
            )

        })
    } else {
        authorDetails = <Author
            books={props.books}
            close={onClickBackIcon}
            addBook={props.addBook}
            author={authorClicked} />
    }


    return (
        <>          
            <div>
                <Toolbar
                    logout={props.logout}
                    toolbarStatus={toolbarStatus}
                    user={props.user} />
            </div>
            {authorDetails}
            <div className={classes.Authors}>
                {authors}
            </div>
        </>
    )
}

export default Authors;