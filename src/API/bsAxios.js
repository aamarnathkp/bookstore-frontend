//import axios from './axios-ccs';

import axiosbasic from 'axios';


axiosbasic.defaults.baseURL = 'http://localhost:7778';
axiosbasic.defaults.withCredentials = true;



//GUEST APIs===================================================================

export const getAllAuthors = () => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'get'
    };
    return axiosbasic('/guest/authors', axiosConfig);
}


export const getAllGuestBooks = () => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'get'
    };
    return axiosbasic('/guest/books', axiosConfig);
}

export const getAllCounts = () => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'get'
    };
    return axiosbasic('/guest/counts', axiosConfig);
}

//=============================================================================

//LOGIN APIs===================================================================

export const loginApi = (username, password) => {
    const authData = {
        "username": username,
        "password": password
    };

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'post',
        data: authData
    };
    return axiosbasic('/login', axiosConfig);
}

export const bsLogout = () => {

    const userId = localStorage.getItem('userId');
    const authData = {
        "user_id": userId
    };

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'post',
        data: authData
    };
    return axiosbasic('/api_rest/logout', axiosConfig);
}

//=============================================================================



//Author APIs =================================================================

export const addAuthor = (authData) => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'post',
        data: authData
    };

    return axiosbasic('/api_rest/add_author', axiosConfig);
}

export const authorModifyApi = (authorId, uploadData) => {
    const axiosConfig = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        credentials: 'include',
        method: 'post',
        data: uploadData
    }
    const path = "api_rest/author/" + authorId;
    return axiosbasic(path, axiosConfig);
}


export const getAllAuthorsApi = (page) => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'get',
        params: {
            data: page
        }

    };
    return axiosbasic('/api_rest/authors', axiosConfig);
}

//=============================================================================

//Books APIs===================================================================

export const addBook = (authData) => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'post',
        data: authData
    };

    return axiosbasic('/api_rest/add_book', axiosConfig);
}

export const bookModifyApi = (bookId, uploadData) => {
    const axiosConfig = {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
        credentials: 'include',
        method: 'post',
        data: uploadData
    }
    const path = "api_rest/book/" + bookId;
    return axiosbasic(path, axiosConfig);
}

export const getAllBooks = () => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'get'
    };
    return axiosbasic('/api_rest/books', axiosConfig);
}

//=============================================================================
//Quiz APIs===================================================================

export const addQuiz = (authData) => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'post',
        data: authData
    };

    return axiosbasic('/api_rest/add_quiz', axiosConfig);
}

export const getAllQuiz = () => {

    const axiosConfig = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        withCredentials: true,
        credentials: 'include',
        method: 'get'
    };
    return axiosbasic('/api_rest/quiz', axiosConfig);
}