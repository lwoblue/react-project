import Login from 'component/login/Login';
import SignUp from 'component/login/SignUp';
import React from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Switch, Route } from 'react-router-dom';


function LoginRoute() {
  return (
    <div>
      {/* <Router> */}
        <Switch>
          <Route exact path={['/', '/login']} component={Login} />
          <Route path="/signUp" component={SignUp} />
        </Switch>
      {/* </Router> */}
    </div>
  );
}

export default LoginRoute;
