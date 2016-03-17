import React, { Component, PropTypes } from 'react';
import Image from './Image';

export default class ImageBoard extends Component {
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
      imageElements = this.props.images.map((image) => {
        return (
          <Image { ...image } key = { image._id } />
        );
      });
    }
    return (
      <div className = 'image-board'>
        { imageElements || '' }
      </div>
    );
  }
}
