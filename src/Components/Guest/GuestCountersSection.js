import React, {useState, useEffect} from 'react';

import classes from './GuestPage.module.css';
import * as axios from '../../API/bsAxios';

const GuestCountersSection = props => {


    const [counts, setCounts] = useState({
        "admins": 0,
        "users": 0,
        "books": 0,
        "authors": 0
    });

    useEffect(() => {
        axios.getAllCounts()
            .then(response => {
                console.log(response);
                const counts = response.data;
                setCounts(counts);
            })
            .then(error => {
                console.log(error)
            })

    }, []);

    return (

        <div>
            <div style={{ height: '54px' }}></div>
            <div className={classes.CountsContainer}>
                <div className={classes.CountContainerBox}>
                    <div className={classes.Count}>
                        <div className={classes.CountCircle}>
                            <div>
                                <div className={classes.CountText}>Books</div>
                                <div className={classes.CountText}>{counts["books"]}</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Count}>
                        <div className={classes.CountCircle}>
                            <div>
                                <div className={classes.CountText}>Authors</div>
                                <div className={classes.CountText}>{counts["authors"]}</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Count}>
                        <div className={classes.CountCircle}>
                            <div>
                                <div className={classes.CountText}>Admins</div>
                                <div className={classes.CountText}>{counts["admins"]}</div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.Count}>
                        <div className={classes.CountCircle}>
                            <div>
                                <div className={classes.CountText}>Users</div>
                                <div className={classes.CountText}>{counts["users"]}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
}

export default GuestCountersSection;