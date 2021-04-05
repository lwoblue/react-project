import { React, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { ThemeProvider } from '@material-ui/styles';
import {
  makeStyles,
  useTheme,
  createMuiTheme,
  fade,
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
  InputBase,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListIcon from '@material-ui/icons/List';
import MoreIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Textsms from '@material-ui/icons/Textsms';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NavContents from './NavContents';
import { auth } from './../../firebase';
import { useStateValue } from 'component/chat/state/StateProvider';
import { actionTypes } from 'component/chat/state/reducer';

const drawerWidth = 240;

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
  root: {
    display: 'flex',
  },
  grow: {
    flexGrow: 1,
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
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
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

  drawerPaper: {
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

  mw: {
    maxWidth: '70%',
    marginRight: '13px',
  },
  title: {
    flexGrow: 1,
  },
  mgL: {
    marginLeft: '10px',
  },
}));

const Nav = (props) => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const history = useHistory();
  const [, dispatch] = useStateValue();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleDrawerOpen = () => {
    setOpen(true);
    props.navWidthValue('240');
    props.appOpen(open);
  };

  const handleDrawerClose = () => {
    setOpen(false);
    props.navWidthValue('60');
    props.appOpen(open);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMenuCloseLogout = () => {
    LogoutClick();
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <ListItem
        button
        component={RouterLink}
        to={'/profile'}
        onClick={handleMenuClose}
      >
        <ListItemText primary={'Profile'} />
      </ListItem>

      <ListItem button onClick={handleMenuCloseLogout}>
        <ListItemText primary={'Logout'} />
      </ListItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <ListItem button component={RouterLink} to={'/chat'}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Textsms />
        </IconButton>
        <ListItemText primary={'Chat'} />
      </ListItem>
      <ListItem button component={RouterLink} to={'/users'}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <ListIcon />
        </IconButton>
        <ListItemText primary={'List'} />
      </ListItem>
      <ListItem button component={RouterLink} to={'/profile'}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <AccountCircle />
        </IconButton>
        <ListItemText primary={'Profile'} />
      </ListItem>
      <ListItem button onClick={LogoutClick}>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <ExitToAppIcon />
        </IconButton>
        <ListItemText primary={'Logout'} />
      </ListItem>
    </Menu>
  );

  return (
    <>
      <ThemeProvider theme={goldColor}>
        <div className={classes.root}>
          <CssBaseline />
          <div className={classes.grow}>
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
                  className={clsx(classes.menuButton, {
                    [classes.hide]: open,
                  })}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                  <ListItem component={RouterLink} to="/">
                    <ListItemText primary="SolomonTs" />
                  </ListItem>
                </Typography>
                <div className={classes.grow} />
                <div className={classes.search}>
                  <div className={classes.searchIcon}>
                    <SearchIcon />
                  </div>
                  <InputBase
                    placeholder="Search…"
                    classes={{
                      root: classes.inputRoot,
                      input: classes.inputInput,
                    }}
                    inputProps={{ 'aria-label': 'search' }}
                  />
                </div>
                <div className={classes.sectionDesktop}>
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <RouterLink to="/chat" color="inherit">
                      <Textsms />
                    </RouterLink>
                  </IconButton>
                  <IconButton aria-label="show 4 new mails" color="inherit">
                    <RouterLink to="/users" color="inherit">
                      <ListIcon />
                    </RouterLink>
                  </IconButton>
                  <IconButton
                    edge="end"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    onClick={handleProfileMenuOpen}
                    color="inherit"
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-label="show more"
                    aria-controls={mobileMenuId}
                    aria-haspopup="true"
                    onClick={handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
          </div>

          <Drawer
            variant="permanent"
            anchor="left"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            })}
            classes={{
              paper: clsx(classes.drawerPaper, {
                [classes.drawerOpen]: open,
                [classes.drawerClose]: !open,
              }),
            }}
          >
            <div className={classes.drawerHeader}>
              <img className={classes.mw} src={'images/logo.png'} alt="logo" />
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === 'rtl' ? (
                  <ChevronRightIcon />
                ) : (
                  <ChevronLeftIcon />
                )}
              </IconButton>
            </div>
            <Divider />
            <NavContents />
          </Drawer>
        </div>
      </ThemeProvider>
    </>
  );
};

export default Nav;
