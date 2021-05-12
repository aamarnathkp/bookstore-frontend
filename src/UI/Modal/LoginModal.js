import React from 'react';
import Modal from '@material-ui/core/Modal';


import LoginPage from '../../Components/Login/LoginPage';




const LoginModal = props => {

    const body = (
       <LoginPage onClose={props.onClose} />
    )

    return (
        <div>

            <Modal
                open={true}
                onClose={props.onClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description">
                {body}
            </Modal>
        </div>
    )
}

export default LoginModal;