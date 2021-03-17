import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from 'component/Home';
import Line from 'component/chart/line/Line';
import Bar from 'component/chart/bar/Bar';

const AppRouter = () => {
  return (
    <div style={style}>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/line" component={Line} />
        <Route path="/bar" component={Bar} />
      </Switch>
    </div>
  );
};

const style = {
  marginTop: '20px',
};

export default AppRouter;
