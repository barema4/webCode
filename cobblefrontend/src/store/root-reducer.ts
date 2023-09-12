import registrationReducer from "./registrationSlice";
import loginReducer from "./loginSlice"

const rootReducers = {
 register: registrationReducer,
 login: loginReducer
};

export default rootReducers