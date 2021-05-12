import React from 'react';
import Modal from '@material-ui/core/Modal';

import AuthorForm from '../Form/AuthorForm';




const authorFormModal = props => {

    //const [open, setModal] = useState(true);

    const body = (
        <AuthorForm
            addAuthor = {props.addAuthor}
            toggleAddAuthor={props.toggleAddAuthor}
            modalClose={props.modalClose} />

    )

    return (
        <div>
tets
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