import React, { useState } from 'react';

import classes from './Pagination.module.css';

const Pagination = props => {
    const [pageCount] = useState(props.count);


    const limit = props.pageLimit ? props.pageLimit : 8;
    const onPageCountClick = (page) => {
        console.log('page clicked', page);
        props.setPage({
            min: page * limit,
            max: (page * limit) + limit
        })
    }


    const pageLimit = Math.ceil(pageCount / 8);
    let pages = [];
    if (pageLimit > 0) {
        for (let i = 0; i < pageLimit; i++) {
            pages.push(<div
                onClick={() => onPageCountClick(i)}
                key={i}>{i}</div>)
        }

    } else {
        pages = <div>Total Count is {pageCount}</div>
    }

    console.log('Count is ', props.count);

    return (
        <div className={classes.PaginationContent}>
            <div className={classes.pagination}>
                <div style={{color:'#4b79b4'}}>
                    Count : {pageCount}
                </div>
                {/* <div href="#">&laquo;</a>
                <a href="#">1</a>
                <a className={classes.pagination + ' active'} href="#">2</a>
                <a href="#">3</a>
                <a href="#">4</a>
                <a href="#">5</a>
                <a href="#">6</a>
                <a href="#">&raquo;</a> */}
                <div>&laquo;</div>
                {pages}
                <div>&raquo;</div>
            </div>
        </div>

    );
}

export default Pagination;