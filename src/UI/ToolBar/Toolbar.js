import React, { useState } from 'react';
import PowerSettingsNewSharpIcon from '@material-ui/icons/PowerSettingsNewSharp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import HomeIcon from '@material-ui/icons/Home';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import PeopleIcon from '@material-ui/icons/People';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';

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


    return (
        <>
            <div className={classes.Toolbar}>
                <div className={classes.Title}>
                    <p onClick={props.logout}><strong>{props.user}</strong></p>
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
                        <PhotoLibraryIcon fontSize={'large'} />SHELFS</div>
                    <div
                        onClick={() => onMenuClicked('REQUESTS')}
                        className={getClassName('REQUESTS')}>
                        <AssignmentIndIcon fontSize={'large'} />REQUESTS</div>
                    <div
                        onClick={() => onMenuClicked('CHAT')}
                        className={getClassName('CHAT')}>
                        <ChatBubbleIcon fontSize={'large'} />CHAT</div>
                </div>
            </div>
            <Holder menuClicked={menuClicked} />
        </>
    )
}

export default Toolbar;