import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { isURL } from 'validator';

const fields = ['url', 'caption'];
const validate = ({ url }) => {
  const errors = {};
  if (!url) {
    errors.url = 'Required';
  } else if (!isURL(url)) {
    errors.url = 'Must be a valid URL';
  }

  return errors;
};

class ImageForm extends Component {

  static propTypes = {
    fields: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired
  }

  render() {
    const { fields: { url, caption }, handleSubmit } = this.props;
    return (
      <form onSubmit = { handleSubmit }>
        <div>
          <label htmlFor='url'>Image Url</label>
          <input
            autoComplete='off'
            name='url'
            placeholder='http://example.com/cat.jpg'
            type='text' { ...url } />
          { url.touched && url.error && <div>{url.error}</div> }
        </div>
        <div>
          <label htmlFor='caption'>Caption</label>
          <input
            autoComplete='off'
            name='caption'
            placeholder='a cute cat'
            type='text' { ...caption } />
        </div>
        <button disabled={!!url.error} type='submit'>Submit</button>
      </form>
    );
  }
}

ImageForm = reduxForm({
  form: 'image',
  fields,
  validate
})(ImageForm);

export default ImageForm;
