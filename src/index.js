import React from 'react';
import ReactDOM from 'react-dom';
import 'public/css/style.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import MainFrame from 'component/layout/MainFrame';
import { StateProvider } from 'component/chat/state/StateProvider';
import reducer, { initialState } from 'component/chat/state/reducer';

ReactDOM.render(
  <>
    <StateProvider initialState={initialState} reducer={reducer}>
      <MainFrame />
    </StateProvider>
  </>,
  document.getElementById('root')
);
