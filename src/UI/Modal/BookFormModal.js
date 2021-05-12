import React from 'react';
import Modal from '@material-ui/core/Modal';

import BookForm from '../Form/AddBookForm';




const bookFormModal = props => {

    const body = (
        <BookForm
        addBook = {props.addBook}
        authors={props.authors}
        toggleAddBook={props.toggleAddBook}
        modalClose={props.modalClose} />

    )


    return (
        <div>

            <Modal
                open={props.open}
                onClose={() => props.modalClose(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {body}
            </Modal>
        </div>
    )
}

export default bookFormModal;