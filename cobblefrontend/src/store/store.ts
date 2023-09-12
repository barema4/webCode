import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducers from "./root-reducer";
import rootSaga from "./root-sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer:rootReducers,
  middleware: [...getDefaultMiddleware({ thunk: false }),sagaMiddleware],
});

sagaMiddleware.run(rootSaga);

export default store;
