import React from 'react';
import Modal from '@material-ui/core/Modal';

import AuthorForm from '../Form/AuthorForm';




const authorFormModal = props => {

    //const [open, setModal] = useState(true);

    const body = (
        <AuthorForm
            addAuthor = {props.addAuthor}
            editAuthor = {props.editAuthor}
            editAuthorDetails = {props.editAuthorDetails}
            toggleAddAuthor={props.toggleAddAuthor}
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

export default authorFormModal;