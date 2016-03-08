import React, { Component } from 'react';
import superAgent from 'superagent';
import { createStore, combineReducers, compose } from 'redux';
import { Provider } from 'react-redux';
import { reducer as formReducer } from 'redux-form';
import ImageForm from './components/ImageForm';
// import Image from './components/Image';

const reducers = {
  form: formReducer
};

const reducer = combineReducers(reducers);
const store = compose(
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)(reducer);

export default class extends Component {
  static displayName = 'ImageBoard'
  static state = {
    images: []
  }

  componentWillMount() {
    superAgent
      .get('http://localhost:3000/api/images')
      .end((err, res) => {
        if (err) return console.log(err);
        this.setState({ images: res.body });
      });
  }

  render() {
    return (
      <Provider store = { store }>
        <ImageForm />
      </Provider>
    );
  }
}
