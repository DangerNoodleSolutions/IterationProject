// BEWARE OF REDUX THUNK
import React from 'react';
import { render } from 'react-dom';
import App from './App';
import styles from './styles.css'
import { combineReducers } from 'redux';

render(
  <App />,
  document.getElementById('root')
);
