import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Authors from '../../Components/Authors/Authors';
import * as actions from '../../store/actions/index';
import Guest from '../../Components/Guest/Guest';

class Home extends Component {

    state = {
        books: this.props.books,
        login: true,
    }

    logout = () => {
        this.props.logout()
    }

    addBook = (book) => {
        this.props.addBook(book)
    }


    searchInputHandler = (type, searchKey, author) => {
        let allBooks = this.props.books;
        switch (type) {
            case 'books':
                if (searchKey === '') {
                    this.setState({ books: allBooks });
                    break;
                }
                const searchLower = searchKey.toLowerCase();
                const allBooksU = allBooks.filter(({ name, author_name }) => {
                    const nameLower = name.toLowerCase();
                    return nameLower.includes(searchLower) && author_name === author;
                })
                this.setState({ books: allBooksU });
                break;
            default: this.setState({ books: allBooks });
                break
        }
    }

    render() {
        let authRedirect = null;
        let x = document.cookie;
        let user = localStorage.getItem('user')
        console.log(x, '....,', user);
        if (x === 'bs_cookie=undefined') {
             authRedirect = <Redirect to='/' />
         }

        let home = null;
        let role = localStorage.getItem('role');
        
        if (role === 'Admin' || role === 'superadmin') {
            home = <Authors
                redirect={authRedirect}
                books={this.props.books}
                addBook={this.addBook}
                logout={this.logout}
                login={this.props.login}
                user={user} />
        } else if (this.props.role === 'Guest') {
            home = <Guest
                logout={this.logout}
                books={this.state.books}
                authors={this.props.authors}
                search={this.searchInputHandler}
                user={user} />
        } else {
            home = <Redirect to='/' />
        }

        console.log(this.props.role, "...", role);
        return (
            <div>
                {authRedirect}
                {home}
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        role: state.login.loginType,
        login: state.login.login,
        books: state.db.books,
        authors: state.db.authors,
        logout: state.login.logout
    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout()),
        addBook: (book) => dispatch(actions.addBook(book))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Home);