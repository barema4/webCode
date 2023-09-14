import { put, takeLatest, call } from "redux-saga/effects";
import {
  setFormValues,
  setLoading,
  setError,
  clearError,
  setRegistrationSuccess,
} from "./registrationSlice";
import { register } from "../utils/api";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  photos: FileList;
  password: string;
  role: string;
}

function* handleRegistration(action: {
  type: string;
  payload: FormValues;
}): unknown {
  try {
    yield put(clearError());
    yield put(setLoading(true));
    const response = yield call(register, action.payload);
    yield put(setFormValues(response.data));
    yield put(setRegistrationSuccess(response.status));
  } catch (error: any) {
    yield put(setError(error.response.data.message || "An error occurred"));
  } finally {
    yield put(setLoading(false));
  }
}

function* watchRegistration() {
  yield takeLatest("REGISTER_USER", handleRegistration);
}

export default watchRegistration;
