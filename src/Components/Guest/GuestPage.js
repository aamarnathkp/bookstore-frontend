import React, { useState } from 'react';
import styled from 'styled-components';
import BookIcon from '@material-ui/icons/Book';
import FingerprintIcon from '@material-ui/icons/Fingerprint';


import CounterSection from './GuestCountersSection';
import BooksSection from './GuestBooksSection';
import AuthorsSection from './GuestAuthorsSection';
import LoginModal from '../../UI/Modal/LoginModal';

const GuestPage = props => {

    const [loginFormStatus, setLoginFormStatus] = useState(false);



    const onOpenModal = () => {
        setLoginFormStatus(true);
    }

    const onCloseModal = () => {
        setLoginFormStatus(false);
    }

    let modal = null;
    if (loginFormStatus) {
        modal = <LoginModal
            open={loginFormStatus}
            onClose={onCloseModal} />
    }


    return (
        <div style={{ backgroundColor: '#dce6ef', position: 'relative' }}>
            {/* <Wrapper> */}
                <Heading>
                    <IconWrapper>
                        <BookIcon fontSize={'large'} />
                    </IconWrapper>
                    <Button>
                        <a href="/">Books</a>
                    </Button>
                    <Button>
                        <a href='/'>Authors</a>
                    </Button>
                    <Login>
                        <IconWrapper>
                            <div onClick={onOpenModal}>
                                <FingerprintIcon fontSize={'large'} />
                            </div>
                        </IconWrapper>
                    </Login>
                </Heading>
            {/* </Wrapper> */}
            {modal}
            <CounterSection />
            <BooksSection />
            <AuthorsSection />
        </div>


    );
}

export default GuestPage;

// const Wrapper = styled.div`
//     flex:1;
// `


const Heading = styled.div`
    display : flex;
    flex-direction: row;
    align-items: center;
    align-content: space-around;
    position: fixed;
    background-color: lightsteelblue;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
`;

const IconWrapper = styled.div`
    padding:6px;
    margin: 8px;
    color: white;

    :hover{
        color: #35547e;
    }
`

const Button = styled.div`
    border-radius: 15px;
    cursor: pointer;
    background-color: white;
    padding: 6px;
    font-size: 16px;
    margin: 20px;
    box-shadow: 0 6px 20px 0 rgba(0, 0, 0, 0.19);

    a {
        text-decoration:none;
        color: #93aed2;
        font-weight:700
    }

    :hover{
        background-color : #e1e1e1;
        color:white
    }
    
`

const Login = styled.div`
    align-self: end;
`