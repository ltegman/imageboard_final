import { takeEvery } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { callApi, postApi } from '../services/api';

function* fetchImages() {
  try {
    const images = yield call(callApi, 'images');
    yield put({ type: 'FETCHED_IMAGES', payload: { images } });
  } catch (err) {
    yield put({ type: 'FETCH_FAILED', payload: err });
  }
}

export function* watchImages() {
  yield* takeEvery('FETCH_IMAGES', fetchImages);
}

function* postImage({ payload }) {
  try {
    const image = yield call(postApi, 'images', payload);
    yield put({ type: 'POSTED_IMAGE', payload: { image } });
  } catch (err) {
    yield put({ type: 'POST_FAILED', payload: err });
  }
}

export function* watchPostImage() {
  yield* takeEvery('POST_IMAGE', postImage);
}
