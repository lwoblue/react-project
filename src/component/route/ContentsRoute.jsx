import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'component/Home';
import ChatFrame from 'component/chat/ChatFrame';
import Gallery from 'component/gallery/Gallery';
import UserListComponent from 'component/user/UserListComponent';
import AddUserComponent from 'component/user/AddUserComponent';
import EditUserComponent from 'component/user/EditUserComponent';
import Login from 'component/login/Login';
import SignUp from 'component/login/SignUp';
import LoginTemplate from 'component/login/LoginTemplate';

const ContentsRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        {/* <Route exact path={['/', '/login']} component={LoginTemplate} /> */}
        {/* <Route path="/home" component={Home} /> */}
        <Route path="/chat" component={ChatFrame} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/users" component={UserListComponent} />
        <Route path="/add-user" component={AddUserComponent} />
        <Route path="/edit-user" component={EditUserComponent} />
        <Route path="/profile" component={EditUserComponent} />
      </Switch>
    </>
  );
};

export default ContentsRoute;
