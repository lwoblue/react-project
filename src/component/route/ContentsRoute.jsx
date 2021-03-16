import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'component/Home';
import Bump from 'component/chart/bump/Bump';

const AppRouter = () => {
  return (
    <div style={style}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/bump" component={Bump} />
      </Switch>
    </div>
  );
};

const style = {
  marginTop: '20px',
};

export default AppRouter;
