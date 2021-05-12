import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';

import classes from './AdminAuthors.module.css';
import Author from './Author/Author';
import * as axios from '../../API/bsAxios';
import AddAuthorModal from '../../UI/Modal/AuthorFormModal';

 
const AdminAuthors = props => {

    const [authorsState, setAuthors] = useState([]);
    const [authorClicked, setAuthorClicked] = useState(null);
    const [authorModalStatus, setAuthorModalStatus] = useState(false);
    const [addAuthor, setAddAuthor] = useState(false);


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
    }, [addAuthor]);


    let authorDetails = null;
    const onAuthorClick = (authorD) => {
        setAuthorClicked(authorD);
    }

    const onClickBackIcon = () => {
        setAuthorClicked(null);
    }

    const onAddAuthorClick = () => {
        console.log('onClick');
        setAuthorModalStatus(true);
    }

    let addAuthorModal = null;
    console.log(authorModalStatus);
    if (authorModalStatus) {
        addAuthorModal = <AddAuthorModal open={authorModalStatus}
            addAuthor={setAddAuthor}
            toggleAddAuthor = {addAuthor}
            modalClose={setAuthorModalStatus} />
    }

    let authors = null;
    let addButton = null;
    if (!authorClicked) {
        authors = authorsState.map((details) => {
            const { uuid, name, about } = details;
            return (
                <div
                    onClick={() => onAuthorClick(details)}
                    key={uuid}
                    className={classes.Author}>
                    <p className={classes.AuthorName}>{name}</p>
                    <p className={classes.AuthorDescription}>{about}</p>
                    <div className={classes.AuthorIcon}><EditIcon /></div>
                    <div className={classes.AuthorIcon}><DeleteIcon /></div>

                </div>
            )

        })
    } else {
        addButton = {display : 'none'};
        authorDetails = <Author
            books={props.books}
            close={onClickBackIcon}
            addBook={props.addBook}
            author={authorClicked} />
    }


    return (

        <>
            {authorDetails}
            {addAuthorModal}
            <div
                style={addButton}
                onClick={onAddAuthorClick}
                className={classes.AddAuthor}>
                <AddCircleIcon fontSize={'large'} /> ADD </div>

            <div className={classes.Authors}>
                {authors}
            </div>

        </>
    )

}

export default AdminAuthors;