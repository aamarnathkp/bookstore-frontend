import React, { useState, useEffect } from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Redirect } from 'react-router-dom';

import classes from './AdminAuthors.module.css';
import Author from './Author/Author';
import * as axios from '../../API/bsAxios';
import AddAuthorModal from '../../UI/Modal/AuthorFormModal';
import Pagination from '../../UI/Pagination/Pagination';


const AdminAuthors = props => {

    const [authorsState, setAuthors] = useState([]);
    const [authorClicked, setAuthorClicked] = useState(null);
    const [authorModalStatus, setAuthorModalStatus] = useState(false);
    const [addAuthor, setAddAuthor] = useState(false);
    const [editAuthor, setEditAuthor] = useState(false);
    const [editAuthorDetails, setEditAuthorDetails] = useState(null);
    const [authorsCount, setAuthorsCount] = useState(null);
    const [page, setPage] = useState(null);
    const [redirect, setRedirect] = useState(null);


    useEffect(() => {
        console.log('reached useEffect');
        axios.getAllAuthorsApi(page)
            .then(response => {
                // console.log(response.data.items);
                setAuthorsCount(response.data.total);
                setAuthors(response.data.items);
            })
            .catch(error => {
                console.log(error);
                console.log(error.response.status);
                if(error.response.status === 401) {
                    setRedirect(<Redirect to='/' />)
                }
                

            });
    }, [addAuthor, editAuthor, page]);


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

    const onEditAuthorClick = (authorD) => {
        console.log('onClick');
        setEditAuthorDetails(authorD);
        setAuthorModalStatus(true);
    }

    let addAuthorModal = null;
    console.log(authorModalStatus);
    if (authorModalStatus) {
        addAuthorModal = <AddAuthorModal open={authorModalStatus}
            addAuthor={setAddAuthor}
            editAuthor={setEditAuthor}
            editAuthorDetails={editAuthorDetails}
            toggleAddAuthor={addAuthor}
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
                    <div className={classes.AuthorIcon} onClick={() => onEditAuthorClick(details)} ><EditIcon /></div>
                    <div className={classes.AuthorIcon}><DeleteIcon /></div>

                </div>
            )

        })
    } else {
        addButton = { display: 'none' };
        authorDetails = <Author
            books={props.books}
            close={onClickBackIcon}
            addBook={props.addBook}
            author={authorClicked} />
    }

    let pagination = null;
    console.log('authors count ', authorsCount);
    if (authorsCount > 0) {
        pagination = <Pagination
            setPage={setPage}
            pageLimit={8}
            count={authorsCount} />
    }


    return (

        <>
            {redirect}
            {authorDetails}
            {addAuthorModal}
            <div className={classes.AuthorMenu}>
                <div
                    style={addButton}
                    onClick={onAddAuthorClick}
                    className={classes.AddAuthor}>
                    <AddCircleIcon fontSize={'large'} /> ADD </div>
                {pagination}
            </div>
            <div className={classes.Authors}>
                {authors}
            </div>
        </>
    )

}

export default AdminAuthors;