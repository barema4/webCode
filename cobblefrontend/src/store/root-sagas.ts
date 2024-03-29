import { all, fork } from "redux-saga/effects";
import watchRegistration from "./registrationSaga";
import watchLogin from "./loginSaga";
import { watchGetUser } from "./userSaga";
import { watchLogout } from "./loginSaga";

const rootSaga = function* () {
  yield all([
    fork(watchRegistration),
    fork(watchLogin),
    fork(watchGetUser),
    fork(watchLogout),
  ]);
};

export default rootSaga;
