import React from 'react';
import Modal from '@material-ui/core/Modal';

import QuizForm from '../Form/Quiz/QuizForm';




const quizFormModal = props => {


    const body = (
        <QuizForm modalClose={props.modalClose} />

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

export default quizFormModal;