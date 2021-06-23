import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
// import Button from '@material-ui/core/Button';

import Quiz from './Quiz/Quiz';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  rootMUI: {
    display: 'flex',
    // boxSizing: 'none'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));



export default function MiniDrawer() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [currentMenu, setMenu] = React.useState('Quiz');

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const themeU = createMuiTheme({
    palette: {
      primary: {
        main: '#4b79b4',
      },
      secondary: {
        main: '#f44336',
      },
    },
    overrides: {
      MuiAppBar: {
        positionAbsolute: {
          top: 'none',
          left: 'none',
          right: 'none'
        }
      }
    }
  });


  const drawerTheme = createMuiTheme({
    overrides: {
      // Style sheet name ⚛️
      MuiDrawer: {
        // Name of the rule
        paperAnchorLeft: {
          // Some CSS
          left: 'none',
          right: 'none'
        },
        paper: {
          top: 'none'
        }
      },
    },
  });


  const onMenuClick = (text) => {
    console.log(text + ' clicked!')
    setMenu(text);
  }

  let menuSelected = null;
  switch (currentMenu) {
    case 'Quiz':
      menuSelected = <Quiz />
      break;
    default:
      menuSelected = currentMenu + ' selected'
      break;

  }

  return (
    <div className={classes.rootMUI}>
      <CssBaseline />
      <ThemeProvider theme={themeU}>
        <AppBar
          position="absolute"
          color="primary"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: open,
              })}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              {currentMenu}
              {/* <Button variant="contained">Default</Button> */}
            </Typography>
          </Toolbar>
        </AppBar>
      </ThemeProvider>
      <ThemeProvider theme={drawerTheme}>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
            </IconButton>
          </div>
          <Divider />
          <List>
            {['Quiz', 'Questions', 'Test Quiz', 'Quiz Instructions'].map((text, index) => (
              <ListItem button key={text} onClick={() => onMenuClick(text)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Report'].map((text, index) => (
              <ListItem button key={text} onClick={() => onMenuClick(text)}>
                <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Drawer>
      </ThemeProvider>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {menuSelected}
      </main>
    </div>
  );
}
