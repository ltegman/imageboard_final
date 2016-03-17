import React from 'react';
import { render } from 'react-dom';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { createStore, compose, applyMiddleware } from 'redux';
import reducer from './redux/reducer';
import createSagaMiddleware from 'redux-saga';
import { watchImages, watchPostImage } from './redux/sagas';

const createStoreWithDevTools = compose(
  applyMiddleware(createSagaMiddleware(watchImages, watchPostImage)),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithDevTools(
  reducer
);

render(<Provider store = { store }><App /></Provider>,
  document.getElementById('app'));
