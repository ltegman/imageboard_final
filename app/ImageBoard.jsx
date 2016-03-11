import React, { Component } from 'react';
import superAgent from 'superagent';
import ImageForm from './components/ImageForm';
// import Image from './components/Image';

export default class extends Component {
  static displayName = 'ImageBoard'
  static state = {
    images: []
  }

  _handlePostImage(data) {
    superAgent
      .post('http://localhost:3000/api/images')
      .send(data)
      .end((err, res) => {
        if (err) return console.log(err);
        this.setState({ images: [...this.state.images, res.body] });
      });
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
    let imageElements;
    if (this.state && this.state.images) {
      imageElements = this.state.images.map((image, idx) => {
        console.log(image);
        return (
          <li key = { idx }>
            <img src = { image.url } style = {{ width: '400px' }}/>
            <p>{ image.caption }</p>
          </li>
        );
      });
    }
    return (
      <div>
        <ImageForm onSubmit = { this._handlePostImage } />
        <ul>{ imageElements || '' }</ul>
      </div>
    );
  }
}
