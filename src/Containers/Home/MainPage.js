import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

//import Authors from '../../Components/Authors/Authors';
import Guest from '../../Components/Guest/Guest';
import AdminHome from '../../Components/Admin/AdminHome';
// import {logout} from '../../store/actions/index';
import * as axios from '../../API/bsAxios';

const MainPage = props => {

    const [loginStatus, setLoginStatus] = useState(true);
    const [books, setBooks] = useState([]);


    // useEffect(() => {
    //     console.log('reached main pages useEffect ');
    //     if (!loginStatus) {
    //         // axios.bsLogout()
    //         //     .then(response => {
    //         //         console.log(response);
    //         //         console.log('cleaningup!!');
    //         //         logoutCleanUp();
    //         //     })
    //         //     .catch(error => {
    //         //         console.log(error);
    //         //         console.log('cleaningup!!');
    //         //         logoutCleanUp();
    //         //     });
    //         // //logout();
    //         logoutCleanUp();
    //     }
    // }, [loginStatus]);

    const logoutCleanUp = () => {
        console.log('logout cleanup!!!');
        // document.cookie = `bs_cookie=undefined`;
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        localStorage.removeItem('userId');
    }

    const userLogout = () => {
        console.log('logout');
        axios.bsLogout()
            .then(response => {
                console.log(response);
                console.log('cleaningup!!');
                logoutCleanUp();
            })
            .catch(error => {
                console.log(error);
                console.log('cleaningup!!');
                logoutCleanUp();
            });
        // logout();
        logoutCleanUp();
        setLoginStatus(false);

    }

    const addBook = (book) => {
        // this.props.addBook(book)
        // api for add book

        console.log('add book');
    }


    const searchInputHandler = (type, searchKey, author) => {
        let allBooks = this.props.books; // api for books
        switch (type) {
            case 'books':
                if (searchKey === '') {
                    setBooks(allBooks);
                    break;
                }
                const searchLower = searchKey.toLowerCase();
                const allBooksU = allBooks.filter(({ name, author_name }) => {
                    const nameLower = name.toLowerCase();
                    return nameLower.includes(searchLower) && author_name === author;
                })
                setBooks(allBooksU);
                break;
            default: setBooks(allBooks);
                break
        }
    }

    let authRedirect = null;
    if (!loginStatus) {
        authRedirect = <Redirect to='/' />
    }

    let home = null;
    let role = localStorage.getItem('role');
    let user = localStorage.getItem('user');
    if (role === 'admin') {
        // home = <Authors
        //     books={books}
        //     addBook={addBook}
        //     logout={userLogout}
        //     user={user} />
        home = <AdminHome
            books={books}
            addBook={addBook}
            logout={userLogout}
            user={user} />
    } else {
        home = <Guest
            logout={userLogout}
            books={books}
            authors={[]}
            search={searchInputHandler}
            user={user} />
    }

    console.log('login status', loginStatus);
    console.log('role = ', role);

    return (
        <>
            {authRedirect}
            {home}
        </>
    );
}

export default MainPage;