import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Login from "component/login/Login";
import clsx from "clsx";
import Nav from "./Nav";
import ContentsRoute from "component/route/ContentsRoute";
import Separator from "./Separator";
import { makeStyles } from "@material-ui/core/styles";
import LoginTemplate from "component/login/LoginTemplate";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  wrap: {
    display: "flex",
    flexDirection: "column",
    height: "100%",
  },
  nav: {
    height: "64px",
  },
  separator: {
    height: "50px",
    padding: "14px",
    boxShadow: "0 2px 2px 0 rgba(0,0,0,0.1)",
    backgroundColor: "white",
  },
  content: {
    display: "flex",
    flex: 1,
    overflow: "auto",
    minHeight: "607px",
  },
  mp: {
    padding: theme.spacing(3),
  },
  main: {
    flexGrow: 1,
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: drawerWidth,
  },
  mainShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

const MainFrame = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  const appOpen = (drOpen) => {
    setOpen(drOpen);
  };

  return (
    <>
      <div className={classes.wrap}>
        <Router>
          {!user ? (
            // <Login />
            <LoginTemplate/>
          ) : (
            <>
              <div className={classes.nav}>
                <Nav appOpen={appOpen} />
              </div>
              <div
                className={[
                  classes.separator,
                  clsx(classes.main, {
                    [classes.mainShift]: open,
                  }),
                ].join("  ")}
              >
                <Separator />
              </div>
              <div className={classes.content}>
                <main
                  className={[
                    classes.mp,
                    clsx(classes.main, {
                      [classes.mainShift]: open,
                    }),
                  ].join("  ")}
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
