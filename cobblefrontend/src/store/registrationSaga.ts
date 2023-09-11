import { put, takeLatest, call } from "redux-saga/effects";
import { setFormValues, setLoading, setError } from "./registrationSlice";
import { register } from "../utils/api";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  photos: any;
  password: string;
  role: string;
}

function* handleRegistration(action: {
  type: string;
  payload: FormValues;
}): unknown {
  try {
    yield put(setLoading(true));
    const response = yield call(register, action.payload);

    yield put(setFormValues(response));
  } catch (error: any) {
    yield put(setError(error.message || "An error occurred"));
  } finally {
    yield put(setLoading(false));
  }
}

function* watchRegistration() {
  yield takeLatest("REGISTER_USER", handleRegistration);
}

export default watchRegistration;
