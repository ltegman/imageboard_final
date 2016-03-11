import React from 'react';
import reactDOM from 'react-dom';
import ImageBoard from './ImageBoard.jsx';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import reducer from './redux/reducer';


const store = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducer);

reactDOM.render(<Provider store = { store }><ImageBoard /></Provider>,
  document.getElementById('app'));
