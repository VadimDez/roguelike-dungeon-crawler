/**
 * Created by Vadym Yatsyuk on 18/02/16
 */
import React from 'react';
import { render } from 'react-dom';
import store from './store'
import './styles/main.scss';
import Game from './components/Game';
import { Provider } from 'react-redux'

render(
  <Provider store={ store }>
    <Game />
  </Provider>,
  document.getElementById('app')
);