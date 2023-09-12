import { put, takeLatest, call } from "redux-saga/effects";
import { getUserErrorAction, getUserSuccessAction } from "./userSlice";
import { getUser } from "../utils/api";
import { AxiosResponse } from "axios";
import { UserType } from "../types/types";

function* getUserSaga():unknown{
  try {
    const response: AxiosResponse<UserType> = yield call(getUser);
    yield put(getUserSuccessAction(response.data));
  } catch (error: any) {
    yield put(getUserErrorAction(error));
  }
}

export function* watchGetUser() {
  yield takeLatest('GET_USER_BY_ID', getUserSaga);
}