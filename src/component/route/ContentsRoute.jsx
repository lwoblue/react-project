import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'component/Home';
import Bar from 'component/chart/bar/Bar';
import ChatFrame from 'component/chat/ChatFrame';
import Gallery from 'component/gallery/Gallery';
import UserListComponent from 'component/user/UserListComponent';
import AddUserComponent from 'component/user/AddUserComponent';
import EditUserComponent from 'component/user/EditUserComponent';

const ContentsRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/home" component={Home} />
        <Route path="/bar" component={Bar} />
        <Route path="/chat" component={ChatFrame} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/users" component={UserListComponent} />
        <Route path="/add-user" component={AddUserComponent} />
        <Route path="/edit-user" component={EditUserComponent} />
        <Route path="/personal-information" component={EditUserComponent} />
      </Switch>
    </>
  );
};

export default ContentsRoute;
