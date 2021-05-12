import React, { useState, useEffect, useRef } from 'react';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

//import classes from './GuestPage.module.css';
import classes from './GuestAuthors.module.css';
import * as axios from '../../API/bsAxios';

const GuestAuthorsSection = props => {


    const [authorsState, setAuthors] = useState([]);
    const ref = useRef(null);

    useEffect(() => {
        console.log('reached useEffect');
        axios.getAllAuthors()
            .then(response => {
                console.log(response.data.items);
                setAuthors(response.data.items);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    let authors = null;

    authors = authorsState.map((details) => {
        const { uuid, name, image } = details;
        return (
            <div key={uuid} className={classes.Author}>
                <img src={image} className={classes.AuthorImage} alt='' />
                <p className={classes.AuthorName}>{name}</p>
            </div>
        )

    })

    const scroll = (scrollOffset) => {
        ref.current.scrollLeft += scrollOffset;
      };

    return (
        <div className={classes.AuthorContainer}>
            <ArrowLeftIcon onClick={() => scroll(-30)} fontSize={'large'} />
            <div className={classes.Authors} ref={ref}>
                {authors}
            </div>
            <ArrowRightIcon onClick={() => scroll(30)} fontSize={'large'}/>
        </div>
    );

}

export default GuestAuthorsSection;