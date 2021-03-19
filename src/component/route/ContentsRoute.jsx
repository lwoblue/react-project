import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'component/Home';
import Line from 'component/chart/line/Line';
import Bar from 'component/chart/bar/Bar';
import SignUp from 'component/login/SignUp';
import Login from 'component/login/Login';

const AppRouter = () => {
  return (
    <div style={style}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/line" component={Line} />
        <Route path="/bar" component={Bar} />
        {/* <Route path="/signUp" component={SignUp} />
        <Route path="/login" component={Login} /> */}
      </Switch>
    </div>
  );
};

const style = {
  marginTop: '20px',
};

export default AppRouter;
