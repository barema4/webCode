import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormValues {
  email: string;
  password: string;
}

interface LoginState {
  status: {};
  loading: boolean;
  error: string | null;
}

const initialState: LoginState = {
  status: "",
  loading: false,
  error: null,
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setLoginStatus(state, action: PayloadAction<FormValues>) {
      state.status = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
});

export const { setLoginStatus, setLoading, setError, clearError } =
  loginSlice.actions;
export default loginSlice.reducer;
