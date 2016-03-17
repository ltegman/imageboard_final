import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { callApi, postApi } from '../services/api';

function* fetchImages() {
  const { response, err } = yield call(callApi, 'images');
  if (response) {
    yield put({ type: 'FETCHED_IMAGES', payload: { images: response } });
  } else {
    yield put({ type: 'FETCH_FAILED', payload: err });
  }
}

export function* watchImages() {
  yield* takeEvery('FETCH_IMAGES', fetchImages);
}

function* postImage({ payload }) {
  const { response, err } = yield call(postApi, 'images', payload);
  if (response) {
    yield put({ type: 'POSTED_IMAGE', payload: { image: response } });
  } else {
    yield put({ type: 'POST_FAILED', payload: err });
  }
}

export function* watchPostImage() {
  yield* takeEvery('POST_IMAGE', postImage);
}
