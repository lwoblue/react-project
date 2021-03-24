import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'component/Home';
import Line from 'component/chart/line/Line';
import Bar from 'component/chart/bar/Bar';
import ChatFrame from 'component/chat/ChatFrame';
import UserListComponent from 'component/user/UserListComponent';
import AddUserComponent from 'component/user/AddUserComponent';
import EditUserComponent from 'component/user/EditUserComponent';

const AppRouter = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/line" component={Line} />
        <Route path="/bar" component={Bar} />
        <Route path="/chat" component={ChatFrame} />
      </Switch>

      <Switch>
        <Route path="/users" component={UserListComponent} />
        <Route path="/add-user" component={AddUserComponent} />
        <Route path="/edit-user" component={EditUserComponent} />
      </Switch>
    </>
  );
};

export default AppRouter;
