export const postImage = (image) => ({
  type: 'ADD_IMAGE',
  payload: { image }
});

export const deleteImage = (index) => ({
  type: 'REMOVE_IMAGE',
  payload: { index }
});

export const editImage = (index, image) => ({
  type: 'EDIT_IMAGE',
  payload: { index, image }
});
