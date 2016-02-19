/**
 * Created by Vadym Yatsyuk on 18/02/16
 */
import React from 'react';
import {render} from 'react-dom';

import './styles/main.scss';
import Game from './components/Game';

render(
  <Game />,
  document.getElementById('app')
)