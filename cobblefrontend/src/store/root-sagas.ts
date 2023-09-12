import { all, fork } from "redux-saga/effects";
import watchRegistration from "./registrationSaga";
import watchLogin from "./loginSaga";
import { watchGetUser } from "./userSaga";

const rootSaga = function* () {
  yield all([fork(watchRegistration), fork(watchLogin), fork(watchGetUser)]);
};

export default rootSaga;
