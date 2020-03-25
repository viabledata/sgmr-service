import { push } from 'connected-react-router';
import { put } from 'redux-saga/effects';

export function* redirectToSignIn({ response }) {
  if (response) {
    switch (response.status) {
      case 401:
      case 422:
      case 405:
        yield put(push(`/sign-in?source=${window.location.pathname}`));
        break;
      default: break;
    }
  }
}

export default redirectToSignIn;
