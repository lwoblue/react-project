import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './Login';
import SignUp from './SignUp';

function LoginTemplate() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path={['/', '/login']} component={Login} />
          <Route path="/signUp" component={SignUp} />
        </Switch>
      </Router>
    </div>
  );
}

export default LoginTemplate;
