import { React, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import clsx from 'clsx';
import Nav from './Nav';
import ContentsRoute from 'component/route/ContentsRoute';
import Separator from './Separator';
import { makeStyles } from '@material-ui/core/styles';
import { useStateValue } from 'component/chat/state/StateProvider';
import LoginRoute from 'component/route/LoginRoute';
// import { useStateValue } from "../chat/state/StateProvider";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  wrap: {
    height: '100%',
    width: `100%`,
    position: 'absolute',
    overflow: 'hidden',
  },
  nav: {
    top: '0',
    height: '64px',
    position: 'absolute',
  },
  separator: {
    top: '64px',
    position: 'absolute',
    zIndex: '1000',
    width: '100%',
    height: '50px',
    padding: '14px',
    boxShadow: '0 2px 2px 0 rgba(0,0,0,0.1)',
    backgroundColor: 'white',
  },
  content: {
    backgroundColor: '#0000000a',
    position: 'absolute',
    top: '100px',
    bottom: '0',
    right: '0',
    left: '0',
    overflow: 'auto',
  },
  mp: {
    padding: theme.spacing(5),
  },
  main: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
  mainShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(9) + 1,
    },
  },
}));

const MainFrame = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(true);
  const [width, setWidth] = useState(60);
  const [{ user }, dispatch] = useStateValue();

  const navWidthValue = (state) => {
    setWidth(width);
  };

  const appOpen = (drOpen) => {
    setOpen(drOpen);
  };

  return (
    <>
      <div className={classes.wrap}>
        <Router>
          {!user ? (
            // <Login />
            <LoginRoute />
          ) : (
            <>
              <div className={classes.nav}>
                <Nav navWidthValue={navWidthValue} appOpen={appOpen} />
              </div>
              <div
                className={[
                  classes.separator,
                  clsx(classes.main, {
                    [classes.mainShift]: open,
                  }),
                ].join('  ')}
              >
                <Separator />
              </div>
              <div className={classes.content}>
                <main
                  className={[
                    classes.separator,
                    clsx(classes.main, {
                      [classes.mainShift]: open,
                    }),
                  ].join('  ')}
                >
                  <ContentsRoute />
                </main>
              </div>
            </>
          )}
        </Router>
      </div>
    </>
  );
};

export default MainFrame;
