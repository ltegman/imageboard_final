import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

function imageReducer(state = [], action) {
  switch (action.type) {
    case 'ADD_IMAGE':
      return [...state, action.image];
    case 'REMOVE_IMAGE':
      state.splice(action.index, 1);
      return [...state];
    case 'EDIT_IMAGE':
      state.splice(action.index, 1, action.image);
      return [...state];
    default:
      return state;
  }
}

const reducers = {
  form: formReducer,
  images: imageReducer
};

export default combineReducers(reducers);
export {
  imageReducer
};
