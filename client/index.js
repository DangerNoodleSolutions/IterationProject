// BEWARE OF REDUX THUNK
import React from 'react';
import { render } from 'react-dom';
// import App from './App';
import styles from './styles.css'
import { combineReducers } from 'redux';
import Routez from './Routez.jsx'

import "core-js/stable";
import "regenerator-runtime/runtime";

render(
  <Routez />,
  document.getElementById('root')
);
