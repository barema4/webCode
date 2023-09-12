import registrationReducer from "./registrationSlice";
import loginReducer from "./loginSlice";
import userReducer from "./userSlice";

const rootReducers = {
  register: registrationReducer,
  login: loginReducer,
  users: userReducer,
};

export default rootReducers;
