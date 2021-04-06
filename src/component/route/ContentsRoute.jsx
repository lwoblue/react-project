import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'component/Home';
import ChatFrame from 'component/chat/ChatFrame';
import Gallery from 'component/gallery/Gallery';
import UserListComponent from 'component/user/UserListComponent';
import AddUserComponent from 'component/user/AddUserComponent';
import EditUserComponent from 'component/user/EditUserComponent';
import MessageListComponent from 'component/message/MessageListComponent';
import DetailMessageComponent from 'component/message/DetailMessageComponent';
import CreateMessageComponent from 'component/message/CreateMessageComponent';

const ContentsRoute = () => {
  return (
    <>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/chat" component={ChatFrame} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/users" component={UserListComponent} />
        <Route path="/add-user" component={AddUserComponent} />
        <Route path="/edit-user" component={EditUserComponent} />
        <Route path="/profile" component={EditUserComponent} />
        <Route path="/message">
          <Switch>
            <Route exact path="/message/" component={MessageListComponent} />
            <Route
              exact
              path="/message/send"
              component={CreateMessageComponent}
            />
            <Route path="/message/:uuid" component={DetailMessageComponent} />
          </Switch>
        </Route>
      </Switch>
    </>
  );
};

export default ContentsRoute;
