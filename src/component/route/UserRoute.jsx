import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import UserListComponent from 'component/user/UserListComponent';
import AddUserComponent from 'component/user/AddUserComponent';
import EditUserComponent from 'component/user/EditUserComponent';

const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={UserListComponent} />
        <Route path="/users" component={UserListComponent} />
        <Route path="/add-user" component={AddUserComponent} />
        <Route path="/edit-user" component={EditUserComponent} />
      </Switch>
    </Router>
  );
};

export default AppRouter;
