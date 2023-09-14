import { put, takeLatest, call } from "redux-saga/effects";
import {
  setLoginStatus,
  setLoading,
  setError,
  clearError,
  logoutSuccess,
} from "./loginSlice";
import { login } from "../utils/api";

interface FormValues {
  email: string;
  password: string;
}

function* handleLogin(action: { type: string; payload: FormValues }): unknown {
  try {
    yield put(clearError());
    yield put(setLoading(true));
    const response = yield call(login, action.payload);
    localStorage.setItem("token", response.data.access_token);
    yield put(setLoginStatus(response.status));
  } catch (error: any) {
    yield put(setError(error.response.data.message));
  } finally {
    yield put(setLoading(false));
  }
}

function* watchLogin() {
  yield takeLatest("LOGIN_REQUEST", handleLogin);
}
export default watchLogin;

function* handleLogout() {
  yield put(logoutSuccess());
  localStorage.removeItem("token");
}

export function* watchLogout() {
  yield takeLatest("LOGOUT_REQUEST", handleLogout);
}
