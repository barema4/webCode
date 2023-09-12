import { all, fork } from "redux-saga/effects";
import watchRegistration from './registrationSaga';
import watchLogin from "./loginSaga";

const rootSaga = function* () {
  yield all([
    fork(watchRegistration),
    fork(watchLogin)
  ]);
};

export default rootSaga;