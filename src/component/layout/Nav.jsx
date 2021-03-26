import React from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { ThemeProvider } from '@material-ui/styles';
import {
  makeStyles,
  useTheme,
  createMuiTheme,
  Button,
  Drawer,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Badge,
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Textsms from '@material-ui/icons/Textsms';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NavContents from './NavContents';
import { auth } from './../../firebase';
import { useStateValue } from 'component/chat/state/StateProvider';
import { actionTypes } from 'component/chat/state/reducer';

const drawerWidth = 210;

const goldColor = createMuiTheme({
  palette: {
    primary: {
      light: '#43a047',
      // main: '#00701a',
      main: '#000000b8',
      contrastText: '#fcc600',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: '1001',
  },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: '#e9e5c2',
  },
  drawerHeader: {
    backgroundColor: '#e9e5c2',
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  drawerFooter: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
  mw: {
    maxWidth: '70%',
    marginRight: '13px',
  },
  title: {
    flexGrow: 1,
  },
  sectionDesktop: {
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

const Nav = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const [state, dispatch] = useStateValue();

  const isMenuOpen = Boolean(anchorEl);

  const menuId = 'primary-search-account-menu';

  const handleDrawerOpen = () => {
    setOpen(true);
    props.appOpen(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    props.appOpen(open);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };
  const handleMenuOpen = () => {};

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );
  const LogoutClick = () => {
    auth
      .signOut()
      .then(() => {
        localStorage.clear();
        dispatch({
          type: actionTypes.SET_USER,
          user: null,
        });
        history.push('/login');
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <>
      <ThemeProvider theme={goldColor}>
        <CssBaseline />
        <AppBar
          theme={goldColor}
          position="fixed"
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
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              className={classes.title}
              // component="a"
              // href="/"
              // label="SolomonTs"
            >
              <ListItem component={RouterLink} to="/">
                <ListItemText primary="SolomonTs" />
              </ListItem>
            </Typography>
            {/* <Button color="inherit" onClick={onOpenChat}>Support</Button> */}
            <div className={classes.sectionDesktop}>
              <IconButton
                aria-label="notifications"
                color="inherit"
                onClick={handleMenuOpen}
              >
                <Badge badgeContent={0} color="secondary">
                  <ListItem component={RouterLink} to="/chat">
                    <Textsms />
                  </ListItem>
                </Badge>
              </IconButton>
              <IconButton
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                // onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <ListItem component={RouterLink} to="/users">
                  <AccountCircle />
                </ListItem>
              </IconButton>
            </div>
            <Button color="inherit" onClick={LogoutClick}>
              Logout
            </Button>
          </Toolbar>
        </AppBar>
        {renderMenu}
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <img className={classes.mw} src={'images/logo.png'} alt="logo" />
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <NavContents />
        </Drawer>
      </ThemeProvider>
    </>
  );
};

export default Nav;
