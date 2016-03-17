import React, { Component, PropTypes } from 'react';
import ImageBoard from './components/ImageBoard';
import ImageForm from './components/ImageForm';
import { connect } from 'react-redux';
import { fetchImages, postImage } from './redux/actions';

class App extends Component {
  static propTypes = {
    images: PropTypes.array.isRequired,
    fetchImages: PropTypes.func.isRequired,
    postImage: PropTypes.func.isRequired
  }

  render() {
    return (
      <div>
        <ImageForm onSubmit = { this.props.postImage }/>
        <ImageBoard { ...this.props }/>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const { images } = state;
  return { images };
};

export default connect(
  mapStateToProps,
  { fetchImages, postImage }
)(App);
