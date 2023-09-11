import { all, fork } from "redux-saga/effects";
import watchRegistration from './registrationSaga';

const rootSaga = function* () {
  yield all([
    fork(watchRegistration),

  ]);
};

export default rootSaga;