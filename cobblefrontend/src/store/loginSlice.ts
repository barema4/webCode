import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormValues {
  email: string;
  password: string;
}

interface LoginState {
  status: {};
  loading: boolean;
  error: string | null;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  status: "",
  loading: false,
  error: null,
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginStatus(state, action: PayloadAction<FormValues>) {
      state.status = action.payload;
      state.isLoggedIn = true;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
      state.isLoggedIn = false;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const {
  setLoginStatus,
  setLoading,
  setError,
  logoutSuccess,
  clearError,
} = loginSlice.actions;
export default loginSlice.reducer;
