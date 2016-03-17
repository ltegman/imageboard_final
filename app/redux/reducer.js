import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

function imageReducer(state = [], action) {
  const { payload } = action;
  switch (action.type) {
    case 'POSTED_IMAGE':
      return [...state, payload.image];
    case 'REMOVE_IMAGE':
      state.splice(payload.index, 1);
      return [...state];
    case 'EDIT_IMAGE':
      state.splice(payload.index, 1, payload.image);
      return [...state];
    case 'FETCHED_IMAGES':
      return payload.images;
    default:
      return state;
  }
}

const reducers = {
  form: formReducer,
  images: imageReducer
};

export default combineReducers(reducers);
