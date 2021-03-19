import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "component/Home";
import Line from "component/chart/line/Line";
import Bar from "component/chart/bar/Bar";
import Chat from "component/chat/Chat";
import Login from "component/login/Login";
import LoginTemplate from "component/login/LoginTemplate";
import SignUp from "component/login/SignUp";

const AppRouter = () => {
  return (
    <Switch>
      <Route exact path="/home" component={Home} />
      <Route path="/line" component={Line} />
      <Route path="/bar" component={Bar} />
      <Route path="/chat" component={Chat} />
     
    </Switch>
  );
};

export default AppRouter;
