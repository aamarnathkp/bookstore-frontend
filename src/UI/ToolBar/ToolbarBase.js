import React, { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import PowerSettingsNewSharpIcon from '@material-ui/icons/PowerSettingsNewSharp';
//import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';

import classes from './ToolbarBase.module.css';





const ToolbarBase = props => {

    // const classesMUI = useStyles();
    const [authors] = useState(props.authors)
    const [bookSearch, setBookSearch] = useState('');
    const [authorSelect, setAuthorSelect] = useState((props.author ? props.authors[0].author_name : ''));
    // console.log(props.toolbarStatus);

    let inputElement = <input
        type='text'
        placeholder='books'
        value={bookSearch}
        className={classes.SearchInput}
        onChange={(event) => inputChangedHandler(event, 'search')}
    />;

    let authorsSearch = null;
    if (props.user === 'Guest') {
        // console.log(authors);
        let options = authors.map(({ author_name }) => {
            return (
                <option key={author_name}>{author_name}</option>
            )
        });
        authorsSearch = <select
            type='text'
            placeholder='authors'
            value={authorSelect}
            onChange={(event) => inputChangedHandler(event, 'options')}
            className={classes.SearchSelect}>
            {options}
        </select>


    }

    const searchBooks = () => {
        props.search('books', bookSearch, authorSelect);
    }



    const inputChangedHandler = (event, value) => {
        console.log('input change handler clicked');
        if (value === 'search') {
            setBookSearch(event.target.value);
        } else {
            console.log(event.target.value);
            setAuthorSelect(event.target.value);
        }

    }

    // let admin = null;
    // if (props.user === 'Admin') {
    //     admin = (
    //         <div className={classes.NavigateBack}>
    //             <NavigateBeforeIcon />
    //         </div>
    //     );
    // }

    return (
        <>
            <div className={classes.Toolbar}>
                <div className={classes.Title}>
                    <p onClick={props.logout}><strong>Hi {props.user}</strong> <PowerSettingsNewSharpIcon /></p>
                </div>
                {/* <div>
                <PowerSettingsNewSharpIcon />
                </div> */}
            </div>
            <div>
                <div className={classes.AppBar}>
                    {/* {admin} */}
                    <div className={classes.AppTitle}>
                        <p> <strong>{props.toolbarStatus}</strong></p>
                    </div>
                    <div className={classes.InputContainer}>

                        {/* <TextField
                            placeholder="   Authors"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }} /> */}

                        {inputElement}

                        <SearchIcon onClick={searchBooks} />


                    </div>
                    <div className={classes.InputContainer}>
                        {authorsSearch}
                    </div>
                    {/* <div className={classesMUI.search}>

            
                



                    </div> */}
                </div>
            </div>


        </>
    )
}

export default ToolbarBase;