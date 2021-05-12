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
        <div style={{ 'backgroundColor': '#dce6ef' }}>
            <Wrapper>
                <Heading>
                    <IconWrapper>
                        <BookIcon fontSize={'large'} />
                    </IconWrapper>
                    <Button>
                        <a href="/guest">Books</a>
                    </Button>
                    <Button>
                        <a href='/guest'>Authors</a>
                    </Button>
                    <Login>
                        <IconWrapper>
                            <div onClick={onOpenModal}>
                                <FingerprintIcon fontSize={'large'} />
                            </div>
                        </IconWrapper>
                    </Login>
                </Heading>
            </Wrapper>
            {modal}
            <CounterSection />
            <BooksSection />
            <AuthorsSection />
        </div>


    );
}

export default GuestPage;

const Wrapper = styled.div`
    flex:1;
`
const IconWrapper = styled.div`
    heigth: 50px;
    padding:10px;
    margin: 8px;
    color: white;

    :hover{
        color: #35547e;
    }
`

const Heading = styled.div`
    display : flex;
    top:0;
    position:fixed;
    width: 100%;
    height : 65px;
    background-color: lightsteelblue;
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)
`;

const Button = styled.div`
    display: flex;
    height: 15px;
    min-width: 85px;
    align-items: center;
    justify-content:center;
    border-radius: 15px;
    cursor: pointer;
    background-color: white;
    padding: 10px;
    margin-left:20px;
    margin-top: 16px;
    margin-right: 15px;
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
    display: flex;
    justify-items: center;
    margin-left:75%;
    align-items: center;
`