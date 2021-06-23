import React, { useState } from 'react';
import PowerSettingsNewSharpIcon from '@material-ui/icons/PowerSettingsNewSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ChatIcon from '@material-ui/icons/Chat';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleIcon from '@material-ui/icons/People';
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AssignmentIcon from '@material-ui/icons/Assignment';

import classes from './Toolbar.module.css';
import Holder from '../../Components/Admin/ContentHolder';





const Toolbar = props => {

    const [menuClicked, setMenuClicked] = useState('HOME');

    const onMenuClicked = (menu) => {
        setMenuClicked(menu);
    }

    const getClassName = (menu) => {
        if (menu === menuClicked) {
            return classes.IconHolderActive;
        } else {
            return classes.IconHolder
        }
    }

    // const notification = "Quiz for the month of May 2021 are available!! Feel free to give it a shot";

    return (
        <>
            <div className={classes.Toolbar}>
                {/* <p className={classes.Title}><strong>Welcome {props.user}</strong></p> */}
                {/* <div className={classes.ScrollText}>
                <h3>{notification} </h3>
                </div> */}
                <div className={classes.TitleIcons}>
                    <p style={{margin: '10px'}}><strong>Welcome {props.user}</strong></p>
                    <AccountCircleIcon fontSize={'large'} />
                    <PowerSettingsNewSharpIcon onClick={props.logout} fontSize={'large'} />

                </div>
            </div>
            <div className={classes.AppBar}>
                <div className={classes.AppTitle}>
                    <div
                        onClick={() => onMenuClicked('HOME')}
                        className={getClassName('HOME')}>
                        <HomeIcon fontSize={'large'} />HOME</div>
                    <div
                        onClick={() => onMenuClicked('BOOKS')}
                        className={getClassName('BOOKS')}>
                        <LocalLibraryIcon fontSize={'large'} />BOOKS</div>
                    <div
                        onClick={() => onMenuClicked('AUTHORS')}
                        className={getClassName('AUTHORS')}>
                        <PeopleIcon fontSize={'large'} />AUTHORS</div>
                    <div
                        onClick={() => onMenuClicked('SHELFS')}
                        className={getClassName('SHELFS')}>
                        <CollectionsBookmarkIcon fontSize={'large'} />SHELFS</div>
                    <div
                        onClick={() => onMenuClicked('REQUESTS')}
                        className={getClassName('REQUESTS')}>
                        <AssignmentIndIcon fontSize={'large'} />REQUESTS</div>
                    <div
                        onClick={() => onMenuClicked('CHAT')}
                        className={getClassName('CHAT')}>
                        <ChatIcon fontSize={'large'} />CHAT</div>
                    <div
                        onClick={() => onMenuClicked('USERS')}
                        className={getClassName('USERS')}>
                        <ContactMailIcon fontSize={'large'} />USERS</div>
                    <div
                        onClick={() => onMenuClicked('QUIZ')}
                        className={getClassName('QUIZ')}>
                        <AssignmentIcon fontSize={'large'} />QUIZ</div>
                </div>
            </div>
            <Holder menuClicked={menuClicked} />
        </>
    )
}

export default Toolbar;