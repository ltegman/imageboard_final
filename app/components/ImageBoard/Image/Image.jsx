import React, { Component, PropTypes } from 'react';

export default class Image extends Component {
  static propTypes = {
    deleteImage: PropTypes.func.isRequired,
    url: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired,
    _id: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired
  }

  render() {
    const { caption, url } = this.props;
    return (
      <div>
        <figure>
          <img src = { url } />
          <figcaption>{ caption }</figcaption>
        </figure>
      </div>
    );
  }
}
