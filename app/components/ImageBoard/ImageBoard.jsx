import React, { Component, PropTypes } from 'react';
// import ImageForm from './components/ImageForm';
// import Image from './components/Image';

export default class extends Component {
  static displayName = 'ImageBoard'
  static propTypes = {
    images: PropTypes.array.isRequired,
    fetchImages: PropTypes.func.isRequired
  }

  componentWillMount() {
    this.props.fetchImages();
  }

  render() {
    let imageElements;
    if (this.props.images) {
      imageElements = this.props.images.map((image, idx) => {
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
        <ul>{ imageElements || '' }</ul>
      </div>
    );
  }
}
