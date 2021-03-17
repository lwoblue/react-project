import React from 'react';
import ReactDOM from 'react-dom';
import 'public/css/style.css';
import MainFrame from 'component/layout/MainFrame';
import Login from 'component/login/Login';

ReactDOM.render(
  <>
    <Login/>
    {/* <MainFrame /> */}
  </>,
  document.getElementById('root')
);
